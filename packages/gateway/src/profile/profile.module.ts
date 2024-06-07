import { Module } from '@nestjs/common';

import { ProfileController } from './profile.controller';

@Module({
    imports: [],
    controllers: [ProfileController],
})
export class ProfileModule {}
