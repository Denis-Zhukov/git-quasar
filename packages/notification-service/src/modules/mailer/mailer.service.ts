import { Injectable } from '@nestjs/common';
import { MailerService as MailerServiceLib } from '@nestjs-modules/mailer';

import { SendMailData } from './types';

@Injectable()
export class MailerService {
    constructor(private readonly mailerService: MailerServiceLib) {}

    async sendMail(data: SendMailData) {
        return this.mailerService.sendMail(data);
    }
}
