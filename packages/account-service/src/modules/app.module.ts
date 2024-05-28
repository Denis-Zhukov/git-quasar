import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [ConfigModule, UserModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
