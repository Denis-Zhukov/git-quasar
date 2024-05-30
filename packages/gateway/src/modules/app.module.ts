import { Module } from '@nestjs/common';

import { AccountServiceModule } from './account-service/account-service.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [AccountServiceModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
