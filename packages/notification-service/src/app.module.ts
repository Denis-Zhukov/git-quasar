import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'ACCOUNT_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:8100'],
                    queue: 'accounts_queue',
                    queueOptions: {
                        durable: false,
                    },
                },
            },
        ]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
