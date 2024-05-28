import { IsBoolean, IsUUID } from 'class-validator';

export class ConfirmAccountDto {
    @IsUUID('4')
        id: string;

    @IsBoolean()
        confirmed: boolean;
}
