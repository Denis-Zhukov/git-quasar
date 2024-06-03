import {
    Body,
    Controller,
    Inject,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Controller('profile')
export class ProfileController {
    constructor(@Inject('ACCOUNT_SERVICE') private rmq: ClientProxy) {}

    @Post('/update/:username')
    @UseInterceptors(FileInterceptor('avatar'))
    public async uploadAvatar(
        @Body() body: object,
        @UploadedFile() avatar: File,
        @Param('username') currentUsername: string,
        @Res() res: Response,
    ) {
        const response = this.rmq.send('account.user.update', {
            currentUsername,
            avatar,
            ...body,
        });
        const { status, message } = await firstValueFrom(response);
        return res.status(status).json({ message });
    }
}
