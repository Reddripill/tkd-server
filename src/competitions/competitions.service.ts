import { Injectable } from '@nestjs/common';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { UpdateCompetitionDto } from './dto/update-competition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Competition } from './entities/competition.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompetitionsService {
  constructor(
    @InjectRepository(Competition)
    private competitionRepository: Repository<Competition>,
  ) {}
  create(createCompetitionDto: CreateCompetitionDto) {
    return this.competitionRepository.insert(createCompetitionDto);
  }

  findAll() {
    return this.competitionRepository.find();
  }

  findOne(id: string) {
    return this.competitionRepository.find({
      where: {
        id,
      },
    });
  }

  update(id: string, updateCompetitionDto: UpdateCompetitionDto) {
    return this.competitionRepository.update(id, updateCompetitionDto);
  }

  remove(id: string) {
    return this.competitionRepository.delete({ id });
  }
}
