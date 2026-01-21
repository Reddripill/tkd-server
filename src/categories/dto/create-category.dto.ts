import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  titles: string[];
}
