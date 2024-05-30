import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as fs from 'fs';
import fsp from 'fs/promises';
import git from 'isomorphic-git';
import * as path from 'path';

import { DatabaseService } from '../database/database.service';
import { CreateRepositoryDto } from './dto/create-repository.dto';

@Injectable()
export class RepositoryService {
    constructor(private db: DatabaseService) {}

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

        await git.init({
            fs,
            gitdir,
            bare: true,
            defaultBranch: 'main',
        });

        const headRefPath = `${gitdir}/refs/heads/HEAD`;
        await fs.promises.writeFile(headRefPath, 'ref: refs/heads/master\n');

        return this.db.repository.create({
            data: { userId, name: repoName, private: privateRepo },
        });
    }
}
