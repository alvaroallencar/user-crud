import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

import { IsEmpty, IsString, IsNotEmpty, IsDateString } from "class-validator";

export class CreateUserDto {
  @ApiHideProperty()
  @IsEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: "YYYY-MM-DD" })
  @IsDateString({ strict: true })
  @IsNotEmpty()
  dateOfBirth: string;

  @ApiHideProperty()
  @IsEmpty()
  createdAt: Date;

  @ApiHideProperty()
  @IsEmpty()
  updatedAt: Date;

  @ApiHideProperty()
  @IsEmpty()
  deletedAt: Date;
}
