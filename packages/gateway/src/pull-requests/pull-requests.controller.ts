import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
    Redirect,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

import { RolesGuard } from '../guards/auth.guard';

@Controller('pull-requests')
export class PullRequestsController {
    constructor(@Inject('REPOSITORY_SERVICE') private rmq: ClientProxy) {}

    @Post('/create')
    @UseGuards(RolesGuard)
    async create(@Body() body: object, @Res() res: Response) {
        const { user } = res.locals;

        const response = this.rmq.send('repository.pull-requests.create', {
            ...body,
            userId: user.id,
        });
        const { status, ...rest } = await firstValueFrom(response);
        res.json(status).json(rest);
    }

    @Get('/:id')
    @Redirect()
    async getPullRequests(@Param('id') id: string) {
        const url = new URL(
            `repository/pull-request/${id}`,
            process.env.REPOSITORY_HOST,
        );

        return { url: url.toString() };
    }

    @UseGuards(RolesGuard)
    @Post('/merge')
    async merge(@Body() body: object, @Res() res: Response) {
        const { user } = res.locals;

        const response = this.rmq.send('repository.pull-requests.merge', {
            ...body,
            userId: user.id,
        });
        const { status, ...rest } = await firstValueFrom(response);
        return res.status(status).json(rest);
    }

    @Get('/:username/:repository')
    @Redirect()
    async getIssues(
        @Param('username') username: string,
        @Param('repository') repository: string,
    ) {
        const url = new URL(
            `/repository/${username}/${repository}/pull-requests`,
            process.env.REPOSITORY_HOST,
        );

        return { url };
    }
}
