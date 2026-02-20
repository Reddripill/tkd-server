import { IsString } from 'class-validator';

export class FindAuthDto {
  @IsString()
  name: string;

  @IsString()
  password: string;
}
