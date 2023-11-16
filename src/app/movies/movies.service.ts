import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Movie } from "./entities/movie.entity";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { MessagesHelper } from "src/helpers/messages.helper";

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,

    private usersService: UsersService,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    console.log(createMovieDto);

    const foundUser = await this.usersService.findOne(createMovieDto.userId);

    const newMovie = this.moviesRepository.create({
      user: foundUser,
      name: createMovieDto.name,
      duration: createMovieDto.duration,
    });

    return await this.moviesRepository.save(newMovie);
  }

  async findAll() {
    return await this.moviesRepository.find({
      order: { name: "ASC" },
      relations: { user: true },
    });
  }

  async findOne(id: string) {
    const foundMovie = await this.moviesRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!foundMovie) {
      throw new NotFoundException(MessagesHelper.MOVIE_NOT_FOUND);
    }

    return foundMovie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    console.log(updateMovieDto);

    const movie = await this.findOne(id);

    this.moviesRepository.merge(movie, updateMovieDto);

    return await this.moviesRepository.save(movie);
  }

  async remove(id: string) {
    const foundMovie = await this.findOne(id);

    return await this.moviesRepository.softRemove(foundMovie);
  }
}
