import { PartialType } from '@nestjs/mapped-types';
import { CreateDisciplineDto } from './create-discipline.dto';
import { IsString } from 'class-validator';

export class UpdateDisciplineDto extends PartialType(CreateDisciplineDto) {
  @IsString()
  title: string;
}
