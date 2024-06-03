import { IsOptional, IsString, Max, MaxLength } from 'class-validator';

import { IsFile } from '../../../decorators/is-file.decorator';

export class UpdateUserDto {
    @IsOptional()
    @IsFile({ mime: ['image/jpg', 'image/png', 'image/jpeg'] })
        avatar: File & { originalname: string; buffer: ArrayBuffer };

    @IsString()
        currentUsername: string;

    @IsString()
        username: string;

    @IsString()
    @MaxLength(255)
        name: string;

    @IsString()
    @MaxLength(255)
        surname: string;

    @IsString()
    @MaxLength(3000)
        bio: string;
}
