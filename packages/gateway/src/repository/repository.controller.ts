import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Patch,
    Post,
    Query,
    Redirect,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/auth.guard';

@Controller('repository')
export class RepositoryController {
    constructor(@Inject('REPOSITORY_SERVICE') private rmq: ClientProxy) {}

    @Roles('user')
    @UseGuards(RolesGuard)
    @Post('/create')
    async createEmptyRepository(
        @Body() body: object,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { user } = res.locals;
        const response = this.rmq.send('repository.create', {
            userId: user.id,
            ...body,
        });
        return firstValueFrom(response);
    }

    @Get('/name/:name')
    async getRepositories(@Param() params: object) {
        const response = this.rmq.send('repository.all.name', { ...params });
        return firstValueFrom(response);
    }

    @Get('/download/:username/:repository')
    @Redirect()
    async downloadRepository(@Param() { username, repository }) {
        const url = new URL(
            `/repository/download/${username}/${repository}/`,
            process.env.REPOSITORY_HOST,
        );

        return { url: url.toString() };
    }

    @Get('info/:username/:repository')
    @Redirect()
    async infoRefs(@Param() { username, repository }, @Query() quries) {
        const url = new URL(
            `/repository/info/${username}/${repository}`,
            process.env.REPOSITORY_HOST,
        );
        Object.entries(quries).forEach(([key, value]: [string, string]) =>
            url.searchParams.append(key, value),
        );
        return { url: url.toString() };
    }

    @Get('file/:username/:repository')
    @Redirect()
    async getFileData(@Param() { username, repository }, @Query() quries) {
        const url = new URL(
            `/repository/file/${username}/${repository}`,
            process.env.REPOSITORY_HOST,
        );
        Object.entries(quries).forEach(([key, value]: [string, string]) =>
            url.searchParams.append(key, value),
        );
        return { url: url.toString() };
    }

    @Roles('user')
    @UseGuards(RolesGuard)
    @Patch('favorite')
    async favoriteRepository(
        @Body() body: object,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { user } = res.locals;
        const response = this.rmq.send('repository.favorite', {
            userId: user.id,
            ...body,
        });
        return firstValueFrom(response);
    }

    @Get('/favorites/:username')
    @Redirect()
    async getFavorites(@Param('username') username: object) {
        const url = new URL(
            `repository/favorites/${username}`,
            process.env.REPOSITORY_HOST,
        );

        return { url: url.toString() };
    }
}
