import { IsNumber, IsOptional } from 'class-validator';

export class getAllUserAccounts {
    @IsNumber()
    @IsOptional()
        limit = 10;

    @IsNumber()
    @IsOptional()
        offset = 0;
}
