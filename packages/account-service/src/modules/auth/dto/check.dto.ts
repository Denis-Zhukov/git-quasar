import { IsString } from 'class-validator';

export class CheckDto {
    @IsString()
        accessToken: string;
}
