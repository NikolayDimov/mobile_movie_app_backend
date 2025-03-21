import { IsNotEmpty, IsString, IsNumber, IsUrl } from "class-validator";

export class CreateMovieDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    year: number;

    @IsNotEmpty()
    @IsNumber()
    length: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsUrl()
    image: string;

    @IsNotEmpty()
    @IsString()
    genre: string;
}
