import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { DatabaseModule } from '../database/database.module';
import { RepositoryController } from './repository.controller';
import { RepositoryService } from './repository.service';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'ACCOUNT_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://admin:admin@localhost:5672'],
                    queue: 'accounts_queue',
                    queueOptions: {
                        durable: false,
                    },
                },
            },
        ]),
        DatabaseModule,
    ],
    providers: [RepositoryService],
    controllers: [RepositoryController],
})
export class RepositoryModule {}
