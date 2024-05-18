import { AppModule } from './app.module';

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://localhost:8100'],
                queue: 'accounts_queue',
                queueOptions: {
                    durable: false,
                },
            },
        },
    );
    await app.listen();
}

bootstrap();
