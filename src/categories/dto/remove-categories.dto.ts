import { IsArray, IsUUID, ArrayNotEmpty } from 'class-validator';

export class RemoveCategoriesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID(undefined, { each: true })
  items: string[];
}
