import { Module } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { MoviesController } from "./movies.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Movie } from "./entities/movie.entity";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), UsersModule],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [TypeOrmModule],
})
export class MoviesModule {}
