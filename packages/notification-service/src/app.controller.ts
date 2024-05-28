import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('')
export class AppController {
    constructor(@Inject('ACCOUNT_SERVICE') private rmq: ClientProxy) {}

    @Get()
    getHello() {
        this.rmq.emit('msg', { key: 1, name: 'Denis' });
        return 'Done';
    }
}
