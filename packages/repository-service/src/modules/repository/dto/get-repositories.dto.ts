import { IsString } from 'class-validator';

export class GetRepositoriesDto {
    @IsString()
        name: string;
}
