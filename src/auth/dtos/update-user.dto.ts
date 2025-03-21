import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
