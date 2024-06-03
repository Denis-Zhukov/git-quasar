import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Inject,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    Redirect,
    Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import { lastValueFrom } from 'rxjs';

@Controller('account')
export class AccountServiceController {
    constructor(@Inject('ACCOUNT_SERVICE') private rmq: ClientProxy) {}

    @Get('/confirm/:id')
    async confirmEmail(@Param() params: object) {
        const response = this.rmq.send('account.user.confirm', {
            ...params,
            confirmed: true,
        });
        return await lastValueFrom(response);
    }

    @Get('/name/:name')
    async getAccountByName(@Param() params: unknown) {
        try {
            const response = this.rmq.send('account.user.one.name', params);
            return await lastValueFrom(response);
        } catch (e) {
            throw new NotFoundException();
        }
    }

    @Get(':id')
    async getAccount(@Param() params: unknown) {
        const response = this.rmq.send('account.user.one', params);
        return await lastValueFrom(response);
    }

    @Get('/avatars/:img')
    @Redirect()
    async getAvatar(@Param('img') img: string) {
        return { url: `${process.env.ACCOUNT_HOST}/avatars/${img}` };
    }

    @Get()
    async getAccounts(@Query() queries: unknown, @Res() res: Response) {
        const response = this.rmq.send('account.user.all', queries);

        const { users, count } = await lastValueFrom<{
            users: unknown;
            count: number;
        }>(response);

        return res
            .setHeader('X-Total-Count', count)
            .status(HttpStatus.OK)
            .json(users);
    }

    @Post()
    async createAccount(@Body() data: unknown) {
        const response = this.rmq.send('account.user.create', data);
        return await lastValueFrom(response);
    }

    @Patch(':username/toggle-block-status')
    async toggleBlockStatus(@Param() params: object, @Body() body: object) {
        const response = this.rmq.send('account.user.block', {
            ...body,
            ...params,
        });
        return await lastValueFrom(response);
    }

    @Patch(':username/toggle-deactivate-status')
    async toggleDeactivateStatus(
        @Param() params: object,
        @Body() body: object,
    ) {
        const response = this.rmq.send('account.user.deactivate', {
            ...params,
            ...body,
        });
        return await lastValueFrom(response);
    }

    @Patch(':id/toggle-confirm-status')
    async toggleConfirmStatus(@Param() params: object, @Body() body: object) {
        const response = this.rmq.send('account.user.confirm', {
            ...params,
            ...body,
        });
        return await lastValueFrom(response);
    }
}
