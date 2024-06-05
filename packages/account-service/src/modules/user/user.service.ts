import { HttpStatus, Injectable } from '@nestjs/common';
import Avatar from 'avatar-builder';
import { genSalt, hash } from 'bcrypt';
import { writeFile } from 'fs/promises';
import * as path from 'path';

import { Roles } from '../../constants/roles';
import { DatabaseService } from '../database/database.service';
import { UpdateUserDto } from './dto/update-user.dto';
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
        const user = await this.db.user.findUnique({
            where: { id },
            include: { userRoles: { include: { role: true } } },
        });
        if (!user)
            return { status: HttpStatus.NOT_FOUND, message: 'user-not-found' };

        return {
            ...user,
            roles: user.userRoles.map(({ role: { name } }) => name),
        };
    }

    public async getUserByName(username: string) {
        const user = await this.db.user.findUnique({
            where: { username },
            include: { userRoles: { include: { role: true } } },
        });
        if (!user)
            return { status: HttpStatus.NOT_FOUND, message: 'user-not-found' };

        const followers = await this.db.subscriber.count({
            where: { userId: user.id },
        });
        const following = await this.db.subscriber.count({
            where: { followerId: user.id },
        });

        return {
            ...user,
            followers,
            following,
            roles: user.userRoles.map(({ role: { name } }) => name),
        };
    }

    public async createUser({ username, email, password }: CreateUserData) {
        const salt = await genSalt();
        const passwordHash = await hash(password, salt);

        const userRole = await this.db.role.findUnique({
            where: {
                name: Roles.user,
            },
        });

        const avatarBuilder = Avatar.squareBuilder(256);
        const avatar = await avatarBuilder.create(username);

        const { id } = await this.db.user.create({
            data: {
                email,
                username: username.toLowerCase(),
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

        await writeFile(
            path.join(process.cwd(), 'static', 'avatars', `${id}.png`),
            avatar,
        );

        await this.db.user.update({
            where: { id },
            data: { avatar: `${id}.png` },
        });

        const { id: idLink } = await this.db.confirmation.findFirst({
            where: { userId: id },
        });

        return { idLink, username, email };
    }

    public async setBlock(username: string, blocked: boolean) {
        return this.db.user.update({
            where: { username },
            data: { blocked },
        });
    }

    public async setDeactivated(username: string, deactivated: boolean) {
        console.log(username, deactivated);
        return this.db.user.update({
            where: { username },
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

    public async updateProfile({
        currentUsername,
        username,
        surname,
        avatar,
        name,
        bio,
    }: UpdateUserDto) {
        const user = await this.db.user.findUnique({
            where: { username: currentUsername },
        });
        if (!user)
            return { status: HttpStatus.BAD_REQUEST, message: 'no-user' };

        const newUsernameUser = await this.db.user.findUnique({
            where: { username },
        });
        if (username !== currentUsername && newUsernameUser)
            return {
                status: HttpStatus.BAD_REQUEST,
                message: 'already-exists',
            };

        const avatarFile = avatar
            ? `${user.id}${path.extname(avatar.originalname)}`
            : undefined;

        await this.db.user.update({
            where: { id: user.id },
            data: {
                username: username.toLowerCase(),
                avatar: avatarFile,
                name,
                surname,
                bio,
            },
        });

        if (avatarFile) {
            await writeFile(
                path.join(process.cwd(), 'static', 'avatars', avatarFile),
                Buffer.from(avatar.buffer),
            );
        }

        return { status: HttpStatus.CREATED, message: 'done' };
    }

    public async getStatistics() {
        const result: { month: string; user_count: number }[] = await this.db
            .$queryRaw`
            SELECT
                EXTRACT(MONTH FROM "created_at") AS month,
                COUNT(*) AS user_count
            FROM
                "users"
            WHERE
                EXTRACT(YEAR FROM "created_at") = EXTRACT(YEAR FROM CURRENT_DATE)
            GROUP BY
                month
            ORDER BY
                month;
        `;

        return result.map(({ user_count, ...rest }) => ({
            ...rest,
            count: Number.parseInt(`${user_count}`),
        }));
    }
}
