import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}

  create(createTournamentDto: CreateTournamentDto) {
    return this.tournamentRepository.insert(createTournamentDto);
  }

  findAll() {
    return this.tournamentRepository.find();
  }

  findOne(id: string) {
    return this.tournamentRepository.find({
      where: {
        id,
      },
    });
  }

  update(id: string, updateTournamentDto: UpdateTournamentDto) {
    return this.tournamentRepository.update(id, updateTournamentDto);
  }

  remove(id: string) {
    return this.tournamentRepository.delete({ id });
  }
}
