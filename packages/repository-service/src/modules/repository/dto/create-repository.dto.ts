import { IsBoolean, IsString } from 'class-validator';

export class CreateRepositoryDto {
    @IsString()
        repoName: string;

    @IsString()
        userId: string;

    @IsBoolean()
        privateRepo: boolean;
}
