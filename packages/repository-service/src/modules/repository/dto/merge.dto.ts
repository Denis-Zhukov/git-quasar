import { IsNotEmpty, IsString } from 'class-validator';

export class MergeDto {
    @IsString()
    @IsNotEmpty()
        pullRequestId: string;

    @IsString()
    @IsNotEmpty()
        userId: string;
}
