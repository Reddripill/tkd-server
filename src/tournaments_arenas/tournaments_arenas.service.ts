import { Injectable } from '@nestjs/common';
import { CreateTournamentsArenaDto } from './dto/create-tournaments_arena.dto';
import { UpdateTournamentsArenaDto } from './dto/update-tournaments_arena.dto';
import { RemoveTournamentsArenaDto } from './dto/delete-tournaments_arena.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TournamentsArena } from './entities/tournaments_arena.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CompetitionsService } from 'src/competitions/competitions.service';

@Injectable()
export class TournamentsArenasService {
  constructor(
    @InjectRepository(TournamentsArena)
    private taRepository: Repository<TournamentsArena>,

    private readonly competitionsService: CompetitionsService,
  ) {}

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

  async removeMany(body: RemoveTournamentsArenaDto) {
    const { items } = body;
    const deletedArenaArr: DeleteResult[] = [];
    for (const { arenaId, tournamentId } of items) {
      await this.competitionsService.removeAllByArena({
        items: [{ arenaId, tournamentId }],
      });

      const deletedArena = await this.taRepository.delete({
        arena: {
          id: arenaId,
        },
        tournament: {
          id: tournamentId,
        },
      });
      deletedArenaArr.push(deletedArena);
    }
    return deletedArenaArr;
  }
}
