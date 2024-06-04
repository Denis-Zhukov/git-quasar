import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveCollaboratorDto {
    @IsString()
    @IsNotEmpty()
        collaboratorId: string;

    @IsString()
    @IsNotEmpty()
        username: string;

    @IsString()
    @IsNotEmpty()
        repository: string;
}
