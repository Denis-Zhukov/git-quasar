import { Module } from '@nestjs/common';

import { AccountServiceModule } from './account-service/account-service.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { GitModule } from './git/git.module';
import { IssuesModule } from './issues/issues.module';
import { ProfileModule } from './profile/profile.module';
import { RepositoryModule } from './repository/repository.module';
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
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
