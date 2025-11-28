import { Module } from '@nestjs/common';
import { CompetitionCategoryService } from './competition_category.service';
import { CompetitionCategoryController } from './competition_category.controller';
import { CompetitionCategory } from './entities/competition_category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CompetitionCategory])],
  controllers: [CompetitionCategoryController],
  providers: [CompetitionCategoryService],
})
export class CompetitionCategoryModule {}
