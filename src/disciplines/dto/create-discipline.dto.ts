import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class CreateDisciplineDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  titles: string[];
}
