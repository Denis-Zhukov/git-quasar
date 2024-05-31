import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
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
}
