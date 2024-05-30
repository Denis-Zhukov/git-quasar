import { Module } from '@nestjs/common';

import { GitController } from './git.controller';

@Module({
    controllers: [GitController],
})
export class GitModule {}
