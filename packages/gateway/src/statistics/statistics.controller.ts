import { Controller, Get, Param, Query, Redirect } from '@nestjs/common';

@Controller('statistics')
export class StatisticsController {
    @Get('/create-account')
    @Redirect()
    async infoRefs(@Query() quries) {
        const url = new URL('/user/statistics', process.env.ACCOUNT_HOST);
        Object.entries(quries).forEach(([key, value]: [string, string]) =>
            url.searchParams.append(key, value),
        );
        return { url: url.toString() };
    }
}
