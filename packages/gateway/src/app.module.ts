import { Module } from '@nestjs/common';

import { AccountServiceModule } from './account-service/account-service.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { GitModule } from './git/git.module';
import { ProfileModule } from './profile/profile.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
    imports: [
        AccountServiceModule,
        AuthModule,
        ConfigModule,
        GitModule,
        RepositoryModule,
        ProfileModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
