import { IsString } from 'class-validator';

export class CreateArenaDto {
  @IsString()
  title: string;
}
