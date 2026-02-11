import { PartialType } from '@nestjs/mapped-types';
import { CreateCompetitionDto } from './create-competition.dto';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCompetitionDto extends PartialType(CreateCompetitionDto) {
  @IsBoolean()
  isFinished: boolean;
}

class ReorderCompetitionItem {
  @IsNumber()
  order: number;

  @IsUUID()
  tournamentId: string;

  @IsUUID()
  arenaId: string;

  @IsUUID()
  id: string;
}

export class ReorderCompetitionDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReorderCompetitionItem)
  items: ReorderCompetitionItem[];
}
