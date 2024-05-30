import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AccountServiceModule } from './account-service/account-service.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { GitModule } from './git/git.module';
import { RolesGuard } from './guards/auth.guard';
import { RepositoryModule } from './repository/repository.module';

@Module({
    imports: [
        AccountServiceModule,
        AuthModule,
        ConfigModule,
        GitModule,
        RepositoryModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
