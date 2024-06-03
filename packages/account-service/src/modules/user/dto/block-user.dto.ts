import { IsBoolean, IsString } from 'class-validator';

export class BlockUserDto {
    @IsString()
        username: string;

    @IsBoolean()
        blocked: boolean;
}
