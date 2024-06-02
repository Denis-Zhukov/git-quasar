import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

import { DatabaseService } from '../database/database.service';
import { CheckDto } from './dto/check.dto';
import { LoginDto } from './dto/login.dto';
import { LogoutDto } from './dto/logout.dto';
import { RefreshDto } from './dto/refresh.dto';
import { JwtPayload } from './types';

@Injectable()
export class AuthService {
    constructor(private db: DatabaseService) {}

    private generateAccessToken(payload: string | object) {
        return sign(payload, process.env.JWT_SECRET_ACCESS, {
            expiresIn: +process.env.ACCESS_EXPIRES_IN,
        });
    }

    private generateRefreshToken(payload: string | object) {
        return sign(payload, process.env.JWT_SECRET_REFRESH, {
            expiresIn: +process.env.REFRESH_EXPIRES_IN,
        });
    }

    async login({ usernameOrEmail, password, userAgent, ipAddress }: LoginDto) {
        const user = await this.db.user.findFirst({
            where: {
                OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
            },
            include: { userRoles: { include: { role: true } } },
        });

        if (!user) throw new RpcException('Wrong username/email or password');

        const correct = await compare(password, user.passwordHash);

        if (!correct)
            throw new RpcException('Wrong username/email or password');

        const payload: JwtPayload = {
            id: user.id,
            roles: user.userRoles.map(({ role: { name } }) => name),
        };

        const accessToken = this.generateAccessToken(payload);
        const refreshToken = this.generateRefreshToken(payload);

        await this.db.session.create({
            data: { userId: user.id, ipAddress, userAgent, refreshToken },
        });

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                username: user.username,
                roles: user.userRoles.map(({ role: { name } }) => name),
                avatar: user.avatar,
            },
        };
    }

    async refresh({ refreshToken }: RefreshDto) {
        const { id } = verify(
            refreshToken,
            process.env.JWT_SECRET_REFRESH,
        ) as JwtPayload;

        const session = await this.db.session.findFirst({
            where: { userId: id, refreshToken },
            include: {
                user: { include: { userRoles: { include: { role: true } } } },
            },
        });

        if (!session) throw new RpcException("Session doesn't match");

        const roles = session.user.userRoles.map(({ role: { name } }) => name);
        const payload: JwtPayload = {
            id,
            roles,
        };

        const accessToken = this.generateAccessToken(payload);

        return {
            accessToken,
            user: {
                id,
                username: session.user.username,
                avatar: session.user.avatar,
                roles,
            },
        };
    }

    async logout({ refreshToken }: LogoutDto) {
        return this.db.session.deleteMany({ where: { refreshToken } });
    }

    async check({ accessToken }: CheckDto) {
        const { id } = verify(
            accessToken,
            process.env.JWT_SECRET_ACCESS,
        ) as JwtPayload;

        const user = await this.db.user.findUnique({
            where: { id },
            include: { userRoles: { include: { role: true } } },
        });

        const roles = user.userRoles.map(({ role: { name } }) => name);

        return { id, roles };
    }
}
