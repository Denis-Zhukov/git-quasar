import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import * as fs from 'fs';
import * as fsp from 'fs/promises';
import git from 'isomorphic-git';
import * as JSZip from 'jszip';
import * as path from 'path';
import { firstValueFrom } from 'rxjs';
import simpleGit from 'simple-git';
import * as tmp from 'tmp-promise';

import { gitBlame } from '../../utils/git-utils';
import { DatabaseService } from '../database/database.service';
import { AddCollaboratorDto } from './dto/add-collaborator.dto';
import { BlameDto } from './dto/blame.dto';
import { CreateIssueDto } from './dto/create-issue.dto';
import { CreatePullRequestDto } from './dto/create-pull-request.dto';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { DeleteRepositoryDto } from './dto/delete-repository.dto';
import { FavoriteRepoDto } from './dto/favorite-repo.dto';
import { GetCollaboratorsDto } from './dto/get-collaborators.dto';
import { GetRepositoriesDto } from './dto/get-repositories.dto';
import { MergeDto } from './dto/merge.dto';
import { MessageIssueDto } from './dto/message-issue.dto';
import { RemoveCollaboratorDto } from './dto/remove-collaborator.dto';

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

    private async getUserByName(name: string) {
        const response = this.rmq.send('account.user.one.name', { name });
        const user = await firstValueFrom(response);
        return user;
    }

    private async getUserById(id: string) {
        const response = this.rmq.send('account.user.one', { id });
        return await firstValueFrom(response);
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

        tempDir.cleanup();
    }

    public async infoRepo(
        username: string,
        repoName: string,
        branch: string,
        currentUser?: string,
    ) {
        const userId = await this.getUserId(username);
        const currentUserId = await this.getUserId(currentUser);

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

        if (!branches.length)
            return {
                status: HttpStatus.OK,
                message: 'is-empty',
                isEmpty: true,
            };

        const files = await git.listFiles({
            fs,
            gitdir,
            ref: branch ?? repo.main_branch,
        });

        const favorite = await this.db.favorite.findFirst({
            where: { userId: currentUserId, repositoryId: repo.id },
        });

        return {
            files,
            branches,
            mainBranch: repo.main_branch,
            favorite: !!favorite,
            owner: repo.userId === currentUserId,
        };
    }

    public async infoFile(
        username: string,
        repoName: string,
        filepath: string,
        branch: string,
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

        const data = await git.show([`${branch ?? repo.main_branch}:${file}`]);
        return { file: data };
    }

    public async blame({ repository, branch, username, filepath }: BlameDto) {
        const userId = await this.getUserId(username);
        if (!userId)
            return { status: HttpStatus.NOT_FOUND, message: 'no-such-user' };

        const repo = await this.db.repository.findFirst({
            where: { userId, name: repository },
            include: { Collaborator: true },
        });

        const gitdir = path.join(
            process.cwd(),
            'repositories',
            userId,
            repo.name,
        );

        const blame = await gitBlame(gitdir, filepath, branch);
        return { status: HttpStatus.OK, file: blame, message: 'get' };
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
        if (repo)
            return { status: HttpStatus.CONFLICT, message: 'already-exists' };

        fs.mkdirSync(gitdir, { recursive: true });
        const git = simpleGit(gitdir);
        await git.init(['--bare']);

        const created = await this.db.repository.create({
            data: { userId, name: repoName, private: privateRepo },
        });

        return { ...created, status: HttpStatus.CREATED, message: 'created' };
    }

    public async deleteRepository({
        username,
        repository,
        userId,
    }: DeleteRepositoryDto) {
        const owner = await this.getUserByName(username);
        if (!owner)
            return { status: HttpStatus.NOT_FOUND, message: 'no-such-owner' };

        const user = await this.getUserById(userId);
        if (!user)
            return { status: HttpStatus.NOT_FOUND, message: 'no-such-user' };

        if (owner.id !== user.id && !owner.roles.includes('admin'))
            return { status: HttpStatus.FORBIDDEN, message: 'no-permission' };

        const repo = await this.db.repository.findFirst({
            where: { userId: owner.id, name: repository },
        });
        if (!repo)
            return { status: HttpStatus.NOT_FOUND, message: 'no-such-repo' };

        const gitdir = path.join(
            process.cwd(),
            'repositories',
            owner.id,
            repo.name,
        );

        await fsp.rm(gitdir, { recursive: true, force: true });
        await this.db.repository.delete({ where: { id: repo.id } });

        return { status: HttpStatus.OK, message: 'deleted' };
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
        return this.db.issue.findUnique({
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

    public async favorite({ repository, userId, username }: FavoriteRepoDto) {
        const user = await this.getUserId(username);
        if (userId !== user)
            return { status: HttpStatus.FORBIDDEN, message: 'forbidden' };

        const repo = await this.db.repository.findFirst({
            where: { userId, name: repository },
        });

        const favorite = await this.db.favorite.findFirst({
            where: { userId, repositoryId: repo.id },
        });

        if (favorite) {
            await this.db.favorite.deleteMany({ where: { ...favorite } });
        } else {
            await this.db.favorite.create({
                data: { userId, repositoryId: repo.id },
            });
        }

        return { status: HttpStatus.CREATED, message: 'done' };
    }

    public async getFavorites(username: string) {
        const userId = await this.getUserId(username);
        if (!userId)
            return { status: HttpStatus.NOT_FOUND, message: 'not-found' };

        const repos = await this.db.favorite.findMany({
            where: { userId },
            select: { repositoryId: true },
        });
        const ids = repos.map(({ repositoryId }) => repositoryId);
        return this.db.repository.findMany({ where: { id: { in: ids } } });
    }

    public async addCollaborator({
        repository,
        collaborator,
        username,
    }: AddCollaboratorDto) {
        const userId = await this.getUserId(username);
        if (!userId)
            return { status: HttpStatus.NOT_FOUND, message: 'no-such-user' };

        const collaboratorId = await this.getUserId(collaborator);
        if (!collaboratorId)
            return {
                status: HttpStatus.NOT_FOUND,
                message: 'no-such-collaborator',
            };

        const repo = await this.db.repository.findFirst({
            where: { userId, name: repository },
            include: { Collaborator: true },
        });
        if (!repo)
            return { status: HttpStatus.NOT_FOUND, message: 'no-such-repo' };
        if (repo.userId === collaboratorId)
            return { status: HttpStatus.BAD_REQUEST, message: 'you-owner' };

        if (repo.Collaborator.find(({ userId }) => userId === collaboratorId))
            return {
                status: HttpStatus.BAD_REQUEST,
                message: 'already-exists',
            };

        await this.db.collaborator.create({
            data: {
                repositoryId: repo.id,
                userId: collaboratorId,
            },
        });

        return { status: HttpStatus.CREATED, message: 'done' };
    }

    public async getCollaborators({
        repository,
        username,
    }: GetCollaboratorsDto) {
        const userId = await this.getUserId(username);
        if (!userId)
            return { status: HttpStatus.NOT_FOUND, message: 'no-such-user' };

        const repo = await this.db.repository.findFirst({
            where: { userId, name: repository },
        });
        if (!repo)
            return { status: HttpStatus.NOT_FOUND, message: 'no-such-repo' };

        const collaboratorsId = await this.db.collaborator.findMany({
            where: { repositoryId: repo.id },
        });
        const collaborators = collaboratorsId.map(async ({ userId }) => {
            const { id, email, username } = await this.getUserById(userId);
            return { id, email, username };
        });
        return await Promise.all(collaborators);
    }

    public async removeCollaborator({
        repository,
        username,
        collaboratorId,
    }: RemoveCollaboratorDto) {
        const userId = await this.getUserId(username);
        if (!userId)
            return { status: HttpStatus.NOT_FOUND, message: 'no-such-user' };

        const repo = await this.db.repository.findFirst({
            where: { userId, name: repository },
        });
        if (!repo)
            return { status: HttpStatus.NOT_FOUND, message: 'no-such-repo' };

        await this.db.collaborator.delete({
            where: { userId: collaboratorId, repositoryId: repo.id },
        });
        return { status: HttpStatus.OK, message: 'done' };
    }

    public async getStatisticsCommits(username: string, repository: string) {
        const owner = await this.getUserByName(username);
        if (!owner)
            return { status: HttpStatus.NOT_FOUND, message: 'no-such-owner' };

        const gitdir = path.join(
            process.cwd(),
            'repositories',
            owner.id,
            repository,
        );

        const gitS = simpleGit(gitdir);
        const authorCount = new Map<string, number>();

        const commits = await gitS.log(['--all']);
        commits.all.forEach(({ author_name }) => {
            if (authorCount.has(author_name)) {
                authorCount.set(author_name, authorCount.get(author_name) + 1);
            } else {
                authorCount.set(author_name, 1);
            }
        });

        return {
            statistic: Object.fromEntries(authorCount.entries()),
            status: HttpStatus.OK,
            message: 'get',
        };
    }

    public async createPullRequest({
        repository,
        username,
        userId,
        source,
        destination,
    }: CreatePullRequestDto) {
        const owner = await this.getUserByName(username);
        if (!owner)
            return { status: HttpStatus.NOT_FOUND, message: 'no-such-owner' };

        const gitdir = path.join(
            process.cwd(),
            'repositories',
            owner.id,
            repository,
        );

        const repo = await this.db.repository.findFirst({
            where: { userId: owner.id, name: repository },
        });

        if (!repo)
            return { status: HttpStatus.BAD_REQUEST, message: 'no-such-repo' };

        const branches = await git.listBranches({ fs, gitdir });
        if (!branches.includes(source)) {
            return {
                status: HttpStatus.BAD_REQUEST,
                message: 'no-such-source-branch',
            };
        }
        if (!branches.includes(destination)) {
            return {
                status: HttpStatus.BAD_REQUEST,
                message: 'no-such-destination-branch',
            };
        }

        const { id } = await this.db.pullRequest.create({
            data: {
                repositoryId: repo.id,
                source,
                destination,
                creatorId: userId,
                title: '',
                content: '',
            },
        });

        return { status: HttpStatus.CREATED, message: 'created', id };
    }

    public async getPullRequest(id: string) {
        const pr = await this.db.pullRequest.findUnique({ where: { id } });
        if (!pr) {
            return {
                status: HttpStatus.BAD_REQUEST,
                message: 'no-such-pr',
            };
        }
        return { ...pr, status: HttpStatus.OK, message: 'get' };
    }

    public async merge({ userId, pullRequestId }: MergeDto) {
        const pr = await this.db.pullRequest.findUnique({
            where: { id: pullRequestId },
            include: { repository: true },
        });

        const { destination, source } = pr;

        const gitdir = path.join(
            process.cwd(),
            'repositories',
            pr.repository.userId,
            pr.repository.name,
        );

        const tempDir = await tmp.dir({ unsafeCleanup: true });

        const git = simpleGit(tempDir.path);

        await git.clone(gitdir, tempDir.path);
        await git.fetch([gitdir, `${source}:${source}`]);
        await git.mergeFromTo(source, destination);

        const result = await git.push(gitdir, destination);

        await this.db.pullRequest.update({
            where: { id: pullRequestId },
            data: { merged: true },
        });

        await tempDir.cleanup();

        return { ...result, message: 'merged', status: HttpStatus.CREATED };
    }
}
