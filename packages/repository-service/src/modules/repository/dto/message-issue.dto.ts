import { IsNotEmpty, IsString } from 'class-validator';

export class MessageIssueDto {
    @IsString()
    @IsNotEmpty()
        userId: string;

    @IsString()
    @IsNotEmpty()
        message: string;

    @IsString()
    @IsNotEmpty()
        issueId: string;
}
