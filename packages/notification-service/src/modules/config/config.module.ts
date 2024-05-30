import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
})
export class ConfigModule {}
