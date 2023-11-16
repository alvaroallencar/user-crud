import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { MessagesHelper } from "src/helpers/messages.helper";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);

    const newUser = this.usersRepository.create(createUserDto);

    return await this.usersRepository.save(newUser);
  }

  async findAll() {
    return await this.usersRepository.find({
      order: { name: "ASC" },
      relations: { movies: true },
    });
  }

  async findOne(id: string) {
    const foundUser = await this.usersRepository.findOne({
      where: { id },
      relations: { movies: true },
    });

    if (!foundUser) {
      throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);
    }

    return foundUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);

    const user = await this.findOne(id);

    this.usersRepository.merge(user, updateUserDto);

    return await this.usersRepository.save(user);
  }

  async remove(id: string) {
    const foundUser = await this.findOne(id);

    return await this.usersRepository.softRemove(foundUser);
  }
}
