import { BadRequestException, Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(BadRequestException)
export class ValidationExceptionFilter extends BaseRpcExceptionFilter<BadRequestException> {
    catch(exception: BadRequestException): Observable<unknown> {
        const errorResponse = {
            statusCode: exception.getStatus(),
            validationErrors: exception.getResponse()['message'],
        };
        return throwError(() => new RpcException(errorResponse));
    }
}
