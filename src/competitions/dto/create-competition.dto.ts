import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

class InfoDto {
  @Transform(({ value }) => {
    if (typeof value !== 'string') return undefined;
    const trimmed = value.trim();
    return trimmed === '' ? undefined : trimmed;
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  discipline?: string;

  @IsOptional()
  @Transform(({ value }: { value: unknown }) => {
    if (!Array.isArray(value)) return value;

    return value
      .filter((v): v is string => typeof v === 'string')
      .map((v) => v.trim())
      .filter((v) => v.length > 0);
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  categories?: string[];
}

class ArenaDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : ''))
  @IsString()
  @IsNotEmpty()
  arenaTitle: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InfoDto)
  info?: InfoDto[];
}

export class CreateCompetitionDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : ''))
  @IsString()
  @IsNotEmpty()
  tournamentTitle: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ArenaDto)
  arenas: ArenaDto[];
}
