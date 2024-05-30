import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    exports: [UserService],
    imports: [
        DatabaseModule,
        ClientsModule.register([
            {
                name: 'NOTIFICATION_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://admin:admin@localhost:5672'],
                    queue: 'notifications_queue',
                    queueOptions: {
                        durable: false,
                    },
                },
            },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
