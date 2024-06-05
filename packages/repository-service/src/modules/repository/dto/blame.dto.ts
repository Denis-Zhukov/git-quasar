import { IsNotEmpty, IsString } from 'class-validator';

export class BlameDto {
    @IsString()
    @IsNotEmpty()
        username: string;

    @IsString()
    @IsNotEmpty()
        repository: string;

    @IsString()
    @IsNotEmpty()
        filepath: string;

    @IsString()
    @IsNotEmpty()
        branch: string;
}
