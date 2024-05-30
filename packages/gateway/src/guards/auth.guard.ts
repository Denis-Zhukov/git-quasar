import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject('ACCOUNT_SERVICE') private rmq: ClientProxy,
    ) {}

    async canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (!requiredRoles) {
            return true;
        }

        const req = context.switchToHttp().getRequest() as Request;
        const res = context.switchToHttp().getResponse() as Response;
        const accessToken = req.header('Authorization').split(' ')?.[1];

        const response = this.rmq.send('account.auth.check', { accessToken });
        const { id, roles }: { id: string; roles: string } =
            await firstValueFrom(response);
        res.locals = { user: { id, roles } };

        return requiredRoles.some((role) => roles?.includes(role));
    }
}
