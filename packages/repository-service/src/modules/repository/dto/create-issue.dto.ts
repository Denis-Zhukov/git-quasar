import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIssueDto {
    @IsString()
    @IsNotEmpty()
        title: string;

    @IsString()
    @IsNotEmpty()
        question: string;

    @IsString()
    @IsNotEmpty()
        usernameOwner: string;

    @IsString()
    @IsNotEmpty()
        userIdCreator: string;

    @IsString()
    @IsNotEmpty()
        repository: string;
}
