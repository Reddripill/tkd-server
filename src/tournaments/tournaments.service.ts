import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { ILike, Repository } from 'typeorm';
import { FindTournamentsDto } from './dto/find-tournaments.dto';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}

  create(createTournamentDto: CreateTournamentDto) {
    return this.tournamentRepository.insert(createTournamentDto);
  }

  async findAll(query: FindTournamentsDto) {
    const { q: querySearch, limit, skip, order } = query;

    const orderPairs = order
      ? Object.fromEntries(
          order.split(',').map((pair) => {
            const [field, direction] = pair.split(':');
            return [field, direction];
          }),
        )
      : undefined;

    const [data, count] = await this.tournamentRepository.findAndCount({
      take: limit,
      skip: skip,
      relations: {
        competitions: {
          arena: true,
          discipline: true,
          categories: true,
        },
      },
      order: orderPairs,
      where: querySearch
        ? {
            title: ILike(`%${querySearch}%`),
          }
        : undefined,
    });
    return {
      data,
      count,
    };
  }

  findOne(id: string) {
    return this.tournamentRepository.findOneBy({ id });
  }

  update(id: string, updateTournamentDto: UpdateTournamentDto) {
    return this.tournamentRepository.update(id, updateTournamentDto);
  }

  remove(id: string) {
    return this.tournamentRepository.delete({ id });
  }
}
