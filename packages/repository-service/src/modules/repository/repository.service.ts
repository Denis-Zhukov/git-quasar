import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import * as fs from 'fs';
import * as fsp from 'fs/promises';
import git from 'isomorphic-git';
import * as JSZip from 'jszip';
import * as path from 'path';
import * as process from 'process';
import { firstValueFrom } from 'rxjs';
import simpleGit from 'simple-git';
import * as tmp from 'tmp-promise';

import { DatabaseService } from '../database/database.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { GetRepositoriesDto } from './dto/get-repositories.dto';
import { MessageIssueDto } from './dto/message-issue.dto';

@Injectable()
export class RepositoryService {
    constructor(
        private db: DatabaseService,
        @Inject('ACCOUNT_SERVICE') private rmq: ClientProxy,
    ) {}

    private async getUserId(name: string) {
        const response = this.rmq.send('account.user.one.name', { name });
        const user = await firstValueFrom(response);
        return user.id as string;
    }

    public async downloadRepo(
        username: string,
        repoName: string,
        res: Response,
    ) {
        const userId = await this.getUserId(username);

        const dir = path.join(process.cwd(), 'repositories', userId, repoName);

        const tempDir = await tmp.dir({ unsafeCleanup: true });
        const zip = new JSZip();

        const git = simpleGit(dir);
        await git.clone(dir, tempDir.path);

        const files = await fsp.readdir(tempDir.path);

        while (files.length > 0) {
            const file = files.pop();
            const filePath = path.join(tempDir.path, file);

            const stats = await fsp.stat(filePath);
            if (stats.isFile()) {
                const content = await fsp.readFile(filePath);
                zip.file(file, content);
            } else if (stats.isDirectory()) {
                const filesInFolder = await fsp.readdir(
                    path.join(tempDir.path, file),
                );
                files.push(
                    ...filesInFolder.map((fileInFolder) =>
                        path.join(file, fileInFolder),
                    ),
                );
            }
        }

        const archiveStream = zip.generateNodeStream({
            type: 'nodebuffer',
            streamFiles: true,
        });

        res.setHeader('Content-Type', 'application/zip');
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=archive.zip',
        );
        archiveStream.pipe(res);

        //tempDir.cleanup();
    }

    public async infoRepo(username: string, repoName: string) {
        const userId = await this.getUserId(username);

        const gitdir = path.join(
            process.cwd(),
            'repositories',
            userId,
            repoName,
        );

        const repo = await this.db.repository.findFirst({
            where: { userId, name: repoName },
        });

        const branches = await git.listBranches({ fs, gitdir });
        if (!repo.main_branch) {
            repo.main_branch = branches.at(0);
            await this.db.repository.update({
                where: { id: repo.id },
                data: repo,
            });
        }

        const files = await git.listFiles({
            fs,
            gitdir,
            ref: repo.main_branch,
        });

        return { files, branches, mainBranch: repo.main_branch };
    }

    public async infoFile(
        username: string,
        repoName: string,
        filepath: string,
    ) {
        const userId = await this.getUserId(username);

        const gitdir = path.join(
            process.cwd(),
            'repositories',
            userId,
            repoName,
        );

        const repo = await this.db.repository.findFirst({
            where: { userId, name: repoName },
        });

        const file = decodeURIComponent(filepath.replace(/^.\//, ''));
        const git = simpleGit(gitdir);
        const data = await git.show([`${repo.main_branch}:${file}`]);
        return { file: data };
    }

    public async createRepository({
        userId,
        repoName,
        privateRepo,
    }: CreateRepositoryDto) {
        const gitdir = path.join(
            process.cwd(),
            'repositories',
            userId,
            repoName,
        );
        const repo = await this.db.repository.findFirst({
            where: { userId, name: repoName },
        });
        if (repo) throw new RpcException('Already exists');

        fs.mkdirSync(gitdir, { recursive: true });
        const git = simpleGit(gitdir);
        await git.init(['--bare']);

        return this.db.repository.create({
            data: { userId, name: repoName, private: privateRepo },
        });
    }

    public async getRepositories({ name }: GetRepositoriesDto) {
        const userId = await this.getUserId(name);

        return this.db.repository.findMany({ where: { userId } });
    }

    public async createIssue({
        userIdCreator,
        title,
        usernameOwner,
        question,
        repository,
    }: CreateIssueDto) {
        const userIdOwner = await this.getUserId(usernameOwner);
        const repo = await this.db.repository.findFirst({
            where: { userId: userIdOwner, name: repository },
        });
        if (!repo) return { status: HttpStatus.NOT_FOUND, message: 'no-repo' };

        const issue = await this.db.issue.create({
            data: {
                repositoryId: repo.id,
                title,
                qustion: question,
            },
        });

        await this.db.issueMessage.create({
            data: {
                userId: userIdCreator,
                issueId: issue.id,
                text: question,
                dislikes: 0,
                likes: 0,
            },
        });

        return { status: HttpStatus.CREATED, message: 'done' };
    }

    public async getIssues(username: string, repository: string) {
        const userId = await this.getUserId(username);
        const repo = await this.db.repository.findFirst({
            where: { userId, name: repository },
        });

        const issues = await this.db.issue.findMany({
            where: { repositoryId: repo.id },
        });

        return issues;
    }

    public async getIssue(issue: string) {
        return await this.db.issue.findUnique({
            where: { id: issue },
            include: { IssueMessage: true },
        });
    }

    public async messageIssue({ message, issueId, userId }: MessageIssueDto) {
        return this.db.issueMessage.create({
            data: {
                text: message,
                userId,
                issueId,
                likes: 0,
                dislikes: 0,
            },
        });
    }
}
