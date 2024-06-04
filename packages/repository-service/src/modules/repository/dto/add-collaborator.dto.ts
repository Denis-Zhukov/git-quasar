import { IsNotEmpty, IsString } from 'class-validator';

export class AddCollaboratorDto {
    @IsNotEmpty()
    @IsString()
        username: string;

    @IsNotEmpty()
    @IsString()
        repository: string;

    @IsNotEmpty()
    @IsString()
        collaborator: string;
}
