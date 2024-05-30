import { IsEmail, IsString } from 'class-validator';

export class ConfirmEmailDto {
    @IsString()
        username: string;

    @IsString()
    @IsEmail()
        email: string;

    @IsString()
        url: string;
}
