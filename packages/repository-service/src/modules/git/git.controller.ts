import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import fsp from 'fs/promises';
import { Git } from 'node-git-server';
import { join } from 'path';

import { exists } from '../../utils/path';

const repoDir = join(process.cwd(), 'repositories');
const git = new Git(repoDir, { autoCreate: false });
const handle = git.handle.bind(git);

@Controller()
export class GitController {
    @Get('/:account/:repo/info/refs')
    async infoRefs(@Req() req: Request, @Res() res: Response) {
        const { service } = req.query;
        const { account, repo } = req.params;

        if (service === 'git-upload-pack') return handle(req, res);

        handle(req, res);

        const emptyFolder = join(process.cwd(), account);
        if (service === 'git-receive-pack' && (await exists(emptyFolder)))
            await fsp.rm(emptyFolder, { recursive: true, force: true });
    }

    @Post([
        '/:account/:repo/git-receive-pack',
        '/:account/:repo/git-upload-pack',
    ])
    async handle(@Req() req: Request, @Res() res: Response) {
        handle(req, res);
    }
}
