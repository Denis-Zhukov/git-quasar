import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteRepositoryDto {
    @IsString()
    @IsNotEmpty()
        userId: string;

    @IsString()
    @IsNotEmpty()
        username: string;

    @IsString()
    @IsNotEmpty()
        repository: string;
}
