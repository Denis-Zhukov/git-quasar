import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { IssuesController } from './issues.controller';

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
            {
                name: 'REPOSITORY_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://admin:admin@localhost:5672'],
                    queue: 'repositories_queue',
                    queueOptions: {
                        durable: false,
                    },
                },
            },
        ]),
    ],
    controllers: [IssuesController],
})
export class IssuesModule {}
