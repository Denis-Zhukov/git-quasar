import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { MailerService } from '../mailer/mailer.service';
import { ConfirmEmailDto } from './dto/ConfirmEmailDto';

@Controller('auth')
export class AuthController {
    constructor(private mailer: MailerService) {}

    @MessagePattern('notification.auth.confirm-email')
    public async confirmEmail({ email, username, url }: ConfirmEmailDto) {
        return await this.mailer.sendMail({
            to: email,
            from: 'noreply@gitquasar.com',
            subject: 'Confirm',
            text: '[TEXT] Hello, ' + username,
            html: `<b>[HTML] Hello ${username}<br/><a href="${url}" rel="noreferrer nofollow noopener" target="_blank">Confirm</a></b>`,
        });
    }
}
