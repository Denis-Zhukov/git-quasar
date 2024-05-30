import { Controller, Get, Param, Query, Redirect } from '@nestjs/common';

@Controller('git')
export class GitController {
    @Get('/:account/:repo/info/refs')
    @Redirect()
    async infoRefs(@Param() { account, repo }, @Query() quries) {
        const url = new URL(
            `${account}/${repo}/info/refs`,
            process.env.REPOSITORY_HOST,
        );
        Object.entries(quries).forEach(([key, value]: [string, string]) =>
            url.searchParams.append(key, value),
        );
        return { url: url.toString() };
    }
}
