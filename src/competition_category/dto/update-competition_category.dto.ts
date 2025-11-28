import { PartialType } from '@nestjs/mapped-types';
import { CreateCompetitionCategoryDto } from './create-competition_category.dto';

export class UpdateCompetitionCategoryDto extends PartialType(
  CreateCompetitionCategoryDto,
) {}
