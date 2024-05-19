import { CreateUserData } from './types';

import { DatabaseService } from '../database/database.service';

import { Roles } from '../../constants/roles';

import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';

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

        return await this.db.user.create({
            data: {
                email,
                username,
                passwordHash,
                salt,
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
        return this.db.user.update({
            where: { id },
            data: { confirmed },
        });
    }
}
