import { Controller, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import {
    BlockUserDto,
    ConfirmAccountDto,
    CreateUserDto,
    DeactivateUserDto,
    UserIdDto,
} from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private service: UserService) {}

    @MessagePattern('account.user.all')
    public async getAll(
        @Payload('_offset', new DefaultValuePipe(0), ParseIntPipe)
            offset: number,
        @Payload('_limit', new DefaultValuePipe(10), ParseIntPipe)
            limit: number,
    ) {
        return this.service.getAllUsers(limit, offset);
    }

    @MessagePattern('account.user.one')
    public async get(@Payload() { id }: UserIdDto) {
        return this.service.getUserByID(id);
    }

    @MessagePattern('account.user.create')
    public async create(@Payload() dto: CreateUserDto) {
        return this.service.createUser(dto);
    }

    @MessagePattern('account.user.block')
    public async block(@Payload() { id, blocked }: BlockUserDto) {
        return this.service.setBlock(id, blocked);
    }

    @MessagePattern('account.user.deactivate')
    public async deactivate(@Payload() { id, deactivated }: DeactivateUserDto) {
        return this.service.setDeactivated(id, deactivated);
    }

    @MessagePattern('account.user.confirm')
    public async active(@Payload() { id, confirmed }: ConfirmAccountDto) {
        return this.service.setConfirmed(id, confirmed);
    }
}
