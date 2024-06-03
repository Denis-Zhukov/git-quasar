import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateIssueDto } from './dto/create-issue.dto';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { GetRepositoriesDto } from './dto/get-repositories.dto';
import { MessageIssueDto } from './dto/message-issue.dto';
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
        @Query('branch') branch: string,
    ) {
        return await this.service.infoRepo(username, repository, branch);
    }

    @Get('/file/:username/:repository')
    async getRepositoryFileInfo(
        @Param()
            { username, repository }: { username: string; repository: string },
        @Query('filepath') path: string,
        @Query('branch') branch: string,
    ) {
        return await this.service.infoFile(username, repository, path, branch);
    }

    @MessagePattern('repository.create')
    async createRepository(@Payload() dto: CreateRepositoryDto) {
        return await this.service.createRepository(dto);
    }

    @MessagePattern('repository.all.name')
    async getRepositories(@Payload() dto: GetRepositoriesDto) {
        return this.service.getRepositories(dto);
    }

    @MessagePattern('repository.issue.create')
    async createIssue(@Payload() dto: CreateIssueDto) {
        return await this.service.createIssue(dto);
    }

    @Get('/:username/:repository/issues')
    async getIssues(
        @Param('username') username: string,
        @Param('repository') repository: string,
    ) {
        return await this.service.getIssues(username, repository);
    }

    @Get('/issue/:issue')
    async getIssue(@Param('issue') issue: string) {
        return await this.service.getIssue(issue);
    }

    @MessagePattern('repository.issue.message')
    async messageIssue(@Payload() dto: MessageIssueDto) {
        return await this.service.messageIssue(dto);
    }

    @MessagePattern('repository.favorite')
    async favoriteRepository(@Payload() dto: CreateIssueDto) {
        return await this.service.createIssue(dto);
    }
}
