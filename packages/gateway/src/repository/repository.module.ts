import { Module } from '@nestjs/common';

import { RepositoryController } from './repository.controller';

@Module({
    imports: [],
    controllers: [RepositoryController],
})
export class RepositoryModule {}
