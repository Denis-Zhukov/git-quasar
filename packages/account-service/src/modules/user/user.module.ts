import { UserController } from './user.controller';
import { UserService } from './user.service';

import { DatabaseModule } from '../database/database.module';

import { Module } from '@nestjs/common';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
