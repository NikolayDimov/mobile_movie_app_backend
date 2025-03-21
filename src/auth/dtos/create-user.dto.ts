import { IsEmail, IsNotEmpty, MaxLength, IsString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  password: string;
}
