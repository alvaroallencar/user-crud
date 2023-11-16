import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsEmpty,
  IsNumber,
  IsUUID,
} from "class-validator";

export class CreateMovieDto {
  @ApiHideProperty()
  @IsEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @ApiHideProperty()
  @IsEmpty()
  createdAt: Date;

  @ApiHideProperty()
  @IsEmpty()
  updatedAt: Date;

  @ApiHideProperty()
  @IsEmpty()
  deletedAt: Date;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
