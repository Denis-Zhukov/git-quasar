import { IsBoolean, IsUUID } from 'class-validator';

export class DeactivateUserDto {
    @IsUUID('4')
    id: string;

    @IsBoolean()
    deactivated: boolean;
}
