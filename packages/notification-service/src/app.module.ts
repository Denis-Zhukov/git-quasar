import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { MailerModule } from './modules/mailer/mailer.module';

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
        MailerModule,
        ConfigModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
