import { Injectable } from '@nestjs/common';
import { CreateCompetitionDisciplineDto } from './dto/create-competition_discipline.dto';
import { UpdateCompetitionDisciplineDto } from './dto/update-competition_discipline.dto';

@Injectable()
export class CompetitionDisciplineService {
  create(createCompetitionDisciplineDto: CreateCompetitionDisciplineDto) {
    return 'This action adds a new competitionDiscipline';
  }

  findAll() {
    return `This action returns all competitionDiscipline`;
  }

  findOne(id: number) {
    return `This action returns a #${id} competitionDiscipline`;
  }

  update(
    id: number,
    updateCompetitionDisciplineDto: UpdateCompetitionDisciplineDto,
  ) {
    return `This action updates a #${id} competitionDiscipline`;
  }

  remove(id: number) {
    return `This action removes a #${id} competitionDiscipline`;
  }
}
