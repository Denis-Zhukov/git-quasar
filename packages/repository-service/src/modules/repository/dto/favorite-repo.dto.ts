import { IsNotEmpty, IsString } from 'class-validator';

export class FavoriteRepoDto {
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
