import { IsNumber, IsOptional } from 'class-validator';

export class getAllUserAccounts {
    @IsNumber()
    @IsOptional()
    limit: number = 10;

    @IsNumber()
    @IsOptional()
    offset: number = 0;
}
