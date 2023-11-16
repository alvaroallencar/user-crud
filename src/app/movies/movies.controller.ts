import { ApiTags } from "@nestjs/swagger";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";

@ApiTags("movies")
@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.moviesService.create(createMovieDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.moviesService.findAll();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async findOne(@Param("id", new ParseUUIDPipe()) id: string) {
    return await this.moviesService.findOne(id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  async update(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return await this.moviesService.update(id, updateMovieDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id", new ParseUUIDPipe()) id: string) {
    return await this.moviesService.remove(id);
  }
}
