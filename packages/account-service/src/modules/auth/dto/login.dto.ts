import { IsOptional, IsString } from 'class-validator';

export class LoginDto {
    @IsString()
        usernameOrEmail: string;

    @IsString()
        password: string;

    @IsString()
    @IsOptional()
        userAgent: string;

    @IsString()
    @IsOptional()
        ipAddress: string;
}
