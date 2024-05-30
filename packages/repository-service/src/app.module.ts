import { Module } from '@nestjs/common';

import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { GitModule } from './modules/git/git.module';
import { RepositoryModule } from './modules/repository/repository.module';

@Module({
    imports: [ConfigModule, DatabaseModule, GitModule, RepositoryModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
