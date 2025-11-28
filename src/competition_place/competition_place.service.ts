import { Injectable } from '@nestjs/common';
import { CreateCompetitionPlaceDto } from './dto/create-competition_place.dto';
import { UpdateCompetitionPlaceDto } from './dto/update-competition_place.dto';

@Injectable()
export class CompetitionPlaceService {
  create(createCompetitionPlaceDto: CreateCompetitionPlaceDto) {
    return 'This action adds a new competitionPlace';
  }

  findAll() {
    return `This action returns all competitionPlace`;
  }

  findOne(id: number) {
    return `This action returns a #${id} competitionPlace`;
  }

  update(id: number, updateCompetitionPlaceDto: UpdateCompetitionPlaceDto) {
    return `This action updates a #${id} competitionPlace`;
  }

  remove(id: number) {
    return `This action removes a #${id} competitionPlace`;
  }
}
