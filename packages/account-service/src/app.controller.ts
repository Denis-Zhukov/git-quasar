import { AppService } from './app.service';

import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @EventPattern('msg')
    getMsg(@Payload() data: number) {
        console.log(data);
    }
}
