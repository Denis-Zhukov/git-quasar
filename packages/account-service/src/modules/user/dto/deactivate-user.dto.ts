import { IsBoolean, IsString } from 'class-validator';

export class DeactivateUserDto {
    @IsString()
        username: string;

    @IsBoolean()
        deactivated: boolean;
}
