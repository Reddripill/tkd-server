import { IsArray, IsUUID, ArrayNotEmpty } from 'class-validator';

export class RemoveDisciplinesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID()
  ids: string[];
}
