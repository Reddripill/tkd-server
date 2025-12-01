import { IsString } from 'class-validator';

export class CreateDisciplineDto {
  @IsString()
  title: string;
}
