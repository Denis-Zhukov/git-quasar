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

import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/auth.guard';

@Controller('issues')
export class IssuesController {
    constructor(@Inject('REPOSITORY_SERVICE') private rmq: ClientProxy) {}

    @Roles()
    @UseGuards(RolesGuard)
    @Post('/create/:username/:repository')
    async createEmptyRepository(
        @Body() body: object,
        @Param('username') username: string,
        @Param('repository') repository: string,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { user } = res.locals;
        const response = this.rmq.send('repository.issue.create', {
            ...body,
            usernameOwner: username,
            repository,
            userIdCreator: user.id,
        });
        return firstValueFrom(response);
    }

    @Get('/:username/:repository')
    @Redirect()
    async getIssues(
        @Param('username') username: string,
        @Param('repository') repository: string,
    ) {
        const url = new URL(
            `/repository/${username}/${repository}/issues`,
            process.env.REPOSITORY_HOST,
        );

        return { url };
    }

    @Get('/:issue')
    @Redirect()
    async getIssue(@Param('issue') issue: string) {
        console.log('hererer');
        const url = new URL(
            `/repository/issue/${issue}`,
            process.env.REPOSITORY_HOST,
        );

        return { url };
    }

    @Roles()
    @UseGuards(RolesGuard)
    @Post('/message')
    async writeMessage(
        @Body() body: object,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { user } = res.locals;
        const response = this.rmq.send('repository.issue.message', {
            ...body,
            userId: user.id,
        });
        return firstValueFrom(response);
    }
}
