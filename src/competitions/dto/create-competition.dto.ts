import { IsString } from 'class-validator';

export class CreateCompetitionDto {
  @IsString()
  title: string;
}
