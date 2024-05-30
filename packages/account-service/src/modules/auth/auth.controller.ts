import { Controller } from '@nestjs/common';
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
        return this.service.login(dto);
    }

    @MessagePattern('account.auth.refresh')
    public async refresh(@Payload() dto: RefreshDto) {
        return this.service.refresh(dto);
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
