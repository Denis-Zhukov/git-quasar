import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
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
}
