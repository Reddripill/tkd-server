import { IsArray, IsUUID, ArrayNotEmpty } from 'class-validator';

export class RemoveCategoriesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID()
  ids: string[];
}
