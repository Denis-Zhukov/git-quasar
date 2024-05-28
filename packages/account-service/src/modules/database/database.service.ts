import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { Roles } from '../../constants/roles';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
        const roles = Object.values(Roles).map((name) => ({ name })) as {
            name: string;
        }[];
        await this.role.createMany({ data: roles, skipDuplicates: true });
    }
}
