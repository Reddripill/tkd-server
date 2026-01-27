import { IsUUID } from 'class-validator';

export class RemoveCompetitionsDto {
  @IsUUID()
  tournament_id: string;

  @IsUUID()
  arena_id: string;
}
