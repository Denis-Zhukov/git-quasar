import { IsNotEmpty, IsString } from 'class-validator';

export class GetCollaboratorsDto {
    @IsString()
    @IsNotEmpty()
        username: string;

    @IsString()
    @IsNotEmpty()
        repository: string;
}
