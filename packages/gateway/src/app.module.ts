import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AccountServiceModule } from './account-service/account-service.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { GitModule } from './git/git.module';
import { IssuesModule } from './issues/issues.module';
import { ProfileModule } from './profile/profile.module';
import { PullRequestsModule } from './pull-requests/pull-requests.module';
import { RepositoryModule } from './repository/repository.module';
import { RmqModule } from './rmq/rmq.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
    imports: [
        AccountServiceModule,
        AuthModule,
        ConfigModule,
        GitModule,
        RepositoryModule,
        ProfileModule,
        IssuesModule,
        StatisticsModule,
        PullRequestsModule,
        RmqModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
