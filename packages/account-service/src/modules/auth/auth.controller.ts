import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AuthService } from './auth.service';
import { CheckDto } from './dto/check.dto';
import { LoginDto } from './dto/login.dto';
import { LogoutDto } from './dto/logout.dto';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @MessagePattern('account.auth.login')
    public async login(@Payload() dto: LoginDto) {
        const result = await this.service.login(dto);
        if ('status' in result) return result;
        return { ...result, status: HttpStatus.OK, message: 'auth' };
    }

    @MessagePattern('account.auth.refresh')
    public async refresh(@Payload() dto: RefreshDto) {
        const result = await this.service.refresh(dto);
        if ('status' in result) return result;
        return { ...result, status: HttpStatus.OK, message: 'updated' };
    }

    @MessagePattern('account.auth.logout')
    public async logout(@Payload() dto: LogoutDto) {
        return this.service.logout(dto);
    }

    @MessagePattern('account.auth.check')
    public async check(@Payload() dto: CheckDto) {
        return this.service.check(dto);
    }
}
