import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Patch,
    Post,
    Query,
    Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import { lastValueFrom } from 'rxjs';

@Controller('account')
export class AccountServiceController {
    constructor(@Inject('ACCOUNT_SERVICE') private rmq: ClientProxy) {}

    @Get(':id')
    async getAccount(@Param() params: unknown) {
        const response = this.rmq.send('account.user.one', params);
        return await lastValueFrom(response);
    }

    @Get()
    async getAccounts(@Query() queries: unknown, @Res() res: Response) {
        const response = this.rmq.send('account.user.all', queries);

        const { users, count } = await lastValueFrom<{
            users: unknown;
            count: number;
        }>(response);

        return res.setHeader('X-Total-Count', count).status(200).json(users);
    }

    @Post()
    async createAccount(@Body() data: unknown) {
        const response = this.rmq.send('account.user.create', data);
        return await lastValueFrom(response);
    }

    @Patch(':id/toggle-block-status')
    async toggleBlockStatus(@Param() params: object, @Body() body: object) {
        const response = this.rmq.send('account.user.block', {
            ...body,
            ...params,
        });
        return await lastValueFrom(response);
    }

    @Patch(':id/toggle-deactivate-status')
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
