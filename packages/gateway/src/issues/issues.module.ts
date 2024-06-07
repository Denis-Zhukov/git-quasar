import { Module } from '@nestjs/common';

import { IssuesController } from './issues.controller';

@Module({
    imports: [],
    controllers: [IssuesController],
})
export class IssuesModule {}
