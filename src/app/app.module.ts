import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { MoviesModule } from "./movies/movies.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "src/database/data-source";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    MoviesModule,
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class AppModule {}
