import {
    Controller,
    Get,
    Inject,
    Param,
    Query,
    Redirect,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('git')
export class GitController {
    constructor(@Inject('ACCOUNT_SERVICE') private rmq: ClientProxy) {}

    @Get('/:account/:repo/info/refs')
    @Redirect()
    async infoRefs(@Param() { account, repo }, @Query() quries) {
        const response = this.rmq.send('account.user.one.name', {
            name: account,
        });
        const { id } = await firstValueFrom(response);

        const url = new URL(
            `${id}/${repo}/info/refs`,
            process.env.REPOSITORY_HOST,
        );
        Object.entries(quries).forEach(([key, value]: [string, string]) =>
            url.searchParams.append(key, value),
        );
        return { url: url.toString() };
    }
}
