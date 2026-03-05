import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { EntityWithTitleArrDto } from 'src/common/dto';

export class UpdateCategoryDto extends PartialType(EntityWithTitleArrDto) {
  @IsString()
  title: string;
}
