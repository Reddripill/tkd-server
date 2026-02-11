import { Injectable } from '@nestjs/common';
import { CreateTournamentsArenaDto } from './dto/create-tournaments_arena.dto';
import { UpdateTournamentsArenaDto } from './dto/update-tournaments_arena.dto';

@Injectable()
export class TournamentsArenasService {
  create(createTournamentsArenaDto: CreateTournamentsArenaDto) {
    return 'This action adds a new tournamentsArena';
  }

  findAll() {
    return `This action returns all tournamentsArenas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tournamentsArena`;
  }

  update(id: number, updateTournamentsArenaDto: UpdateTournamentsArenaDto) {
    return `This action updates a #${id} tournamentsArena`;
  }

  remove(id: number) {
    return `This action removes a #${id} tournamentsArena`;
  }
}
