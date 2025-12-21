import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class InfoDto {
  @IsString()
  discipline: string;

  @IsOptional()
  @IsArray()
  categories?: string[];
}

class ArenaDto {
  @IsString()
  arenaTitle: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InfoDto)
  info?: InfoDto[];
}

export class CreateCompetitionDto {
  @IsString()
  tournamentTitle: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ArenaDto)
  arenas: ArenaDto[];
}
