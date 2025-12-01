import { PartialType } from '@nestjs/mapped-types';
import { CreateCompetitionDto } from './create-competition.dto';
import { IsString } from 'class-validator';

export class UpdateCompetitionDto extends PartialType(CreateCompetitionDto) {
  @IsString()
  title: string;
}
