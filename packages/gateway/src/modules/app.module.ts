import { Module } from '@nestjs/common';

import { AccountServiceModule } from './account-service/account-service.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';

@Module({
    imports: [AccountServiceModule, AuthModule, ConfigModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
