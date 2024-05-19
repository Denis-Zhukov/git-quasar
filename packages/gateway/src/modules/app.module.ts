import { AccountServiceModule } from './account-service/account-service.module';

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'SERVICE_NAME',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'gateway_queue',
                    queueOptions: {
                        durable: false,
                    },
                },
            },
        ]),
        AccountServiceModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
