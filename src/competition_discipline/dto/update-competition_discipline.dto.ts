import { PartialType } from '@nestjs/mapped-types';
import { CreateCompetitionDisciplineDto } from './create-competition_discipline.dto';

export class UpdateCompetitionDisciplineDto extends PartialType(
  CreateCompetitionDisciplineDto,
) {}
