import { Injectable } from '@nestjs/common';
import { CreateArenaDto } from './dto/create-arena.dto';
import { UpdateArenaDto } from './dto/update-arena.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Arena } from './entities/arenas.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArenasService {
  constructor(
    @InjectRepository(Arena)
    private arenaRepository: Repository<Arena>,
  ) {}

  create(createArenaDto: CreateArenaDto) {
    return this.arenaRepository.insert(createArenaDto);
  }

  findAll() {
    return this.arenaRepository.find();
  }

  findOne(id: string) {
    return this.arenaRepository.find({ where: { id } });
  }

  update(id: string, updateArenaDto: UpdateArenaDto) {
    return this.arenaRepository.update(id, updateArenaDto);
  }

  remove(id: string) {
    return this.arenaRepository.delete(id);
  }
}
