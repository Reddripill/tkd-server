import { Injectable } from '@nestjs/common';
import { CreateCompetitionCategoryDto } from './dto/create-competition_category.dto';
import { UpdateCompetitionCategoryDto } from './dto/update-competition_category.dto';

@Injectable()
export class CompetitionCategoriesService {
  create(createCompetitionCategoryDto: CreateCompetitionCategoryDto) {
    return 'This action adds a new competitionCategory';
  }

  findAll() {
    return `This action returns all competitionCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} competitionCategory`;
  }

  update(
    id: number,
    updateCompetitionCategoryDto: UpdateCompetitionCategoryDto,
  ) {
    return `This action updates a #${id} competitionCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} competitionCategory`;
  }
}
