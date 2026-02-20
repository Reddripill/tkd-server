import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { FindUsersDto } from './dto/find-users.dto';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createuserDto: CreateUserDto) {
    const { password, ...credentials } = createuserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.insert({
      password: hashedPassword,
      ...credentials,
    });
  }

  async findAll(query: FindUsersDto) {
    const { q: querySearch, limit, skip, order } = query;

    const orderPairs = order
      ? Object.fromEntries(
          order.split(',').map((pair) => {
            const [field, direction] = pair.split(':');
            return [field, direction];
          }),
        )
      : undefined;

    const [data, count] = await this.userRepository.findAndCount({
      take: limit,
      skip: skip,
      order: orderPairs,
      where: querySearch
        ? {
            name: ILike(`%${querySearch}%`),
          }
        : undefined,
    });
    return {
      data,
      count,
    };
  }

  findOne(name: string) {
    return this.userRepository.findOneBy({ name });
  }

  async update(id: string, updateDisciplineDto: UpdateUserDto) {
    const { password, ...credentials } = updateDisciplineDto;
    let hashedPassword = password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    return this.userRepository.update(id, {
      password: hashedPassword,
      ...credentials,
    });
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }

  removeMany(ids: string[]) {
    return this.userRepository.delete(ids);
  }
}
