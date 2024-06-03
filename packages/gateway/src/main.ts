import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.enableCors({ credentials: true, origin: true });
    await app.listen(3000);
}

bootstrap();
