import { IsNotEmpty, IsString, IsDateString, IsUUID, IsOptional } from 'class-validator';

export class CreateMovieDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsDateString()
    release_date: string;

    @IsNotEmpty()
    @IsString()
    genre: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsNotEmpty()
    @IsString()
    length: string;

    @IsNotEmpty()
    @IsUUID()
    user_id: string;
}
