import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    Inject,
    Post,
    Req,
    Res,
    UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('ACCOUNT_SERVICE') private accountRmq: ClientProxy,
        @Inject('NOTIFICATION_SERVICE') private notificationRmq: ClientProxy,
    ) {}

    @Post('register')
    public async register(@Body() body: object) {
        try {
            const response = this.accountRmq.send('account.user.create', {
                ...body,
            });
            return await firstValueFrom(response);
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    @Post('login')
    public async login(
        @Body() body: object,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const userAgent = req.headers['user-agent'];
        const ipAddress =
            req.ip ||
            req.connection.remoteAddress ||
            req.headers['x-forwarded-for'];

        try {
            const response = this.accountRmq.send('account.auth.login', {
                ...body,
                userAgent,
                ipAddress,
            });

            const data = await firstValueFrom(response);
            if (!data) return res.sendStatus(HttpStatus.UNAUTHORIZED);
            const { refreshToken, ...restData } = data;
            return res.cookie('refresh-token', refreshToken).json(restData);
        } catch (e) {
            return res.status(HttpStatus.UNAUTHORIZED).json(e);
        }
    }

    @Post('refresh')
    public async refresh(@Body() body: object) {
        try {
            const response = this.accountRmq.send('account.auth.refresh', {
                ...body,
            });

            return await firstValueFrom(response);
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
