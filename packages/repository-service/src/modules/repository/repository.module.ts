import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { RepositoryController } from './repository.controller';
import { RepositoryService } from './repository.service';

@Module({
    imports: [DatabaseModule],
    providers: [RepositoryService],
    controllers: [RepositoryController],
})
export class RepositoryModule {}
