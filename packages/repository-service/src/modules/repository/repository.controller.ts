import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';

import { AddCollaboratorDto } from './dto/add-collaborator.dto';
import { CreateIssueDto } from './dto/create-issue.dto';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { DeleteRepositoryDto } from './dto/delete-repository.dto';
import { FavoriteRepoDto } from './dto/favorite-repo.dto';
import { GetRepositoriesDto } from './dto/get-repositories.dto';
import { MessageIssueDto } from './dto/message-issue.dto';
import { RemoveCollaboratorDto } from './dto/remove-collaborator.dto';
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
        @Query('currentUser') currentUser: string,
    ) {
        return await this.service.infoRepo(
            username,
            repository,
            branch,
            currentUser,
        );
    }

    @Get('/file/:username/:repository')
    async getRepositoryFileInfo(
        @Param()
            { username, repository }: { username: string; repository: string },
        @Query('filepath') path: string,
        @Query('branch') branch: string,
    ) {
        const { file } = await this.service.infoFile(
            username,
            repository,
            path,
            branch,
        );
        return { file, path };
    }

    @MessagePattern('repository.create')
    async createRepository(@Payload() dto: CreateRepositoryDto) {
        return await this.service.createRepository(dto);
    }

    @MessagePattern('repository.delete')
    async deleteRepository(@Payload() dto: DeleteRepositoryDto) {
        return await this.service.deleteRepository(dto);
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
    async favoriteRepository(@Payload() dto: FavoriteRepoDto) {
        return await this.service.favorite(dto);
    }

    @Get('/favorites/:username')
    async getFavorites(@Param('username') username: string) {
        return await this.service.getFavorites(username);
    }

    @MessagePattern('repository.collaborator.add')
    async addCollaborator(@Payload() dto: AddCollaboratorDto) {
        return await this.service.addCollaborator(dto);
    }

    @Get('/collaborators/:username/:repository')
    async getCollaborators(
        @Param('username') username: string,
        @Param('repository') repository: string,
    ) {
        return await this.service.getCollaborators({ username, repository });
    }

    @MessagePattern('repository.collaborator.remove')
    async removeCollaborator(@Payload() dto: RemoveCollaboratorDto) {
        return await this.service.removeCollaborator(dto);
    }

    @Get('/blame/:username/:repository')
    async blame(
        @Param('username') username: string,
        @Param('repository') repository: string,
        @Query('filepath') filepath: string,
        @Query('branch') branch: string,
        @Res() res: Response,
    ) {
        const { status, ...rest } = await this.service.blame({
            username,
            repository,
            filepath,
            branch,
        });
        res.status(status).json({ ...rest, path: filepath });
    }

    @Get('/statistics/:username/:repository/commits')
    async getStatisticsCommits(
        @Param('username') username: string,
        @Param('repository') repository: string,
        @Query('branch') branch: string,
        @Res() res: Response,
    ) {
        const { status, ...rest } = await this.service.getStatisticsCommits(
            username,
            repository,
            branch,
        );
        res.status(status).json({ ...rest });
    }
}
