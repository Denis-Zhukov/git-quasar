import { Module } from '@nestjs/common';

import { GitController } from './git.controller';

@Module({
    imports: [],
    controllers: [GitController],
})
export class GitModule {}
