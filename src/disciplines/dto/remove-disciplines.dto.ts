import { IsArray, IsUUID, ArrayNotEmpty } from 'class-validator';

export class RemoveDisciplinesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID(undefined, { each: true })
  items: string[];
}
