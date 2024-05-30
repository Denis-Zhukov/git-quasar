import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { ValidationExceptionFilter } from '../utils/validation-exception-filter';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [process.env.AMQP_URL],
            queue: process.env.QUEUE_NAME,
            queueOptions: {
                durable: false,
            },
        },
    });
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new ValidationExceptionFilter());

    await app.startAllMicroservices();
    await app.listen(3001);
}

bootstrap();
