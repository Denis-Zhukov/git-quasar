import { Module } from '@nestjs/common';

import { PullRequestsController } from './pull-requests.controller';

@Module({
    controllers: [PullRequestsController],
})
export class PullRequestsModule {}
