import { Module } from '@nestjs/common';

import { AccountServiceController } from './account-service.controller';

@Module({
    imports: [],
    controllers: [AccountServiceController],
    providers: [],
})
export class AccountServiceModule {}
