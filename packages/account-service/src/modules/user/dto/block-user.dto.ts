import { IsBoolean, IsUUID } from 'class-validator';

export class BlockUserDto {
    @IsUUID('4')
    id: string;

    @IsBoolean()
    blocked: boolean;
}
