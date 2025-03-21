import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  created: Date;

  @ApiProperty()
  updated: Date;

  @ApiProperty()
  deleted: Date | null;
}
