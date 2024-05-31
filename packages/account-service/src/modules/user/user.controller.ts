import {
    Controller,
    DefaultValuePipe,
    Inject,
    ParseIntPipe,
} from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

import {
    BlockUserDto,
    ConfirmAccountDto,
    CreateUserDto,
    DeactivateUserDto,
    UserIdDto,
} from './dto';
import { UserNameDto } from './dto/user-name.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private service: UserService,
        @Inject('NOTIFICATION_SERVICE') private accountRmq: ClientProxy,
    ) {}

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

    @MessagePattern('account.user.one.name')
    public async getByName(@Payload() { name }: UserNameDto) {
        return this.service.getUserByName(name);
    }

    @MessagePattern('account.user.create')
    public async create(@Payload() dto: CreateUserDto) {
        const { idLink, username, email } = await this.service.createUser(dto);
        const response = this.accountRmq.send(
            'notification.auth.confirm-email',
            {
                username,
                email,
                url: `http://localhost:3000/account/confirm/${idLink}`,
            },
        );
        return response;
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
