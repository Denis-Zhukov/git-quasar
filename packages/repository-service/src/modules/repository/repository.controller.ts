import { Body, Controller, Get, Param, Query, Res } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateRepositoryDto } from './dto/create-repository.dto';
import { GetRepositoriesDto } from './dto/get-repositories.dto';
import { RepositoryService } from './repository.service';

@Controller('repository')
export class RepositoryController {
    constructor(private service: RepositoryService) {}

    @Get('/download/:username/:repository')
    async getRepo(
        @Res() res,
        @Param()
            { username, repository }: { username: string; repository: string },
    ) {
        await this.service.downloadRepo(username, repository, res);
    }

    @Get('/info/:username/:repository')
    async getRepositoryInfo(
        @Param()
            { username, repository }: { username: string; repository: string },
    ) {
        return await this.service.infoRepo(username, repository);
    }

    @Get('/file/:username/:repository')
    async getRepositoryFileInfo(
        @Param()
            { username, repository }: { username: string; repository: string },
        @Query('filepath') path: string,
    ) {
        return await this.service.infoFile(username, repository, path);
    }

    @MessagePattern('repository.create')
    async createRepository(@Payload() dto: CreateRepositoryDto) {
        return await this.service.createRepository(dto);
    }

    @MessagePattern('repository.all.name')
    async getRepositories(@Payload() dto: GetRepositoriesDto) {
        return this.service.getRepositories(dto);
    }
}
