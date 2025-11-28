import { PartialType } from '@nestjs/mapped-types';
import { CreateCompetitionPlaceDto } from './create-competition_place.dto';

export class UpdateCompetitionPlaceDto extends PartialType(
  CreateCompetitionPlaceDto,
) {}
