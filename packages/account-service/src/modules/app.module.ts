import { UserModule } from './user/user.module';

import { ConfigModule } from './config/config.module';

import { Module } from '@nestjs/common';

@Module({
    imports: [ConfigModule, UserModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
