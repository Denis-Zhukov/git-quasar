import { Module } from '@nestjs/common';
import { MailerModule as MailerModuleLib } from '@nestjs-modules/mailer';

import { ConfigModule } from '../config/config.module';
import { MailerService } from './mailer.service';

@Module({
    imports: [
        ConfigModule,
        MailerModuleLib.forRoot({
            transport: {
                host: process.env.MAIL_HOST,
                secure: true,
                port: process.env.MAIL_PORT,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
            },
            defaults: {
                from: '"No Reply" <noreply@example.com>',
            },
        }),
    ],
    providers: [MailerService],
    exports: [MailerService],
})
export class MailerModule {}
