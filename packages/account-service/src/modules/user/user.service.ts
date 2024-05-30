import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';

import { Roles } from '../../constants/roles';
import { DatabaseService } from '../database/database.service';
import { CreateUserData } from './types';

@Injectable()
export class UserService {
    constructor(private db: DatabaseService) {}

    public async getAllUsers(limit: number, offset: number) {
        const count = await this.db.user.count();
        const users = await this.db.user.findMany({
            take: limit,
            skip: offset,
        });
        return { count, users };
    }

    public async getUserByID(id: string) {
        return this.db.user.findUnique({ where: { id } });
    }

    public async createUser({ username, email, password }: CreateUserData) {
        const salt = await genSalt();
        const passwordHash = await hash(password, salt);

        const userRole = await this.db.role.findUnique({
            where: {
                name: Roles.user,
            },
        });

        const { id } = await this.db.user.create({
            data: {
                email,
                username,
                passwordHash,
                salt,
                confirmations: {
                    create: {},
                },
                userRoles: {
                    create: {
                        role: {
                            connect: {
                                id: userRole.id,
                            },
                        },
                    },
                },
            },
        });

        const { id: idLink } = await this.db.confirmation.findFirst({
            where: { userId: id },
        });

        return { idLink, username, email };
    }

    public async setBlock(id: string, blocked: boolean) {
        return this.db.user.update({
            where: { id },
            data: { blocked },
        });
    }

    public async setDeactivated(id: string, deactivated: boolean) {
        return this.db.user.update({
            where: { id },
            data: { deactivated },
        });
    }

    public async setConfirmed(id: string, confirmed: boolean) {
        const { userId } = await this.db.confirmation.findFirst({
            where: { id },
        });

        await this.db.user.update({
            where: { id: userId },
            data: { confirmed },
        });

        if (confirmed) await this.db.confirmation.deleteMany({ where: { id } });

        return id;
    }
}
