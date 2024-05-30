import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { setOriginalUrlMiddleware } from '../../middlewares/set-original-url.middleware';
import { GitController } from './git.controller';

@Module({
    controllers: [GitController],
})
export class GitModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(setOriginalUrlMiddleware).forRoutes(GitController);
    }
}
