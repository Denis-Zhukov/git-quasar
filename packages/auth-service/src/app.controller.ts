import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {PrismaClient} from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const client = new PrismaClient();
    client.user
    return this.appService.getHello();
  }
}
