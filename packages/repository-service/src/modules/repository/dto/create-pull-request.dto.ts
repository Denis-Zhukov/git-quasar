import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePullRequestDto {
    @IsString()
    @IsNotEmpty()
        userId: string;

    @IsString()
    @IsNotEmpty()
        title: string;

    @IsString()
    @IsNotEmpty()
        content: string;

    @IsString()
    @IsNotEmpty()
        username: string;

    @IsString()
    @IsNotEmpty()
        repository: string;

    @IsString()
    @IsNotEmpty()
        source: string;

    @IsString()
    @IsNotEmpty()
        destination: string;
}
