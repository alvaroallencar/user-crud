import { PartialType, OmitType } from "@nestjs/swagger";
import { CreateMovieDto } from "./create-movie.dto";
import { IsEmpty } from "class-validator";

export class UpdateMovieDto extends PartialType(
  OmitType(CreateMovieDto, ["userId"] as const),
) {
  @IsEmpty()
  userId: string;
}
