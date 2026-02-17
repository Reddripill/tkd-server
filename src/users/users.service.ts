import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { FindUsersDto } from './dto/find-users.dto';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createuserDto: CreateUserDto) {
    return this.userRepository.insert(createuserDto);
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

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: string, updateDisciplineDto: UpdateUserDto) {
    return this.userRepository.update(id, updateDisciplineDto);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }

  removeMany(ids: string[]) {
    return this.userRepository.delete(ids);
  }
}
