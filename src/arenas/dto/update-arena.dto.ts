import { PartialType } from '@nestjs/mapped-types';
import { CreateArenaDto } from './create-arena.dto';
import { IsString } from 'class-validator';

export class UpdateArenaDto extends PartialType(CreateArenaDto) {
  @IsString()
  title: string;
}
