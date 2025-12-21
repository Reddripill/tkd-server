import { Module } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CompetitionsController } from './competitions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competition } from './entities/competition.entity';
import { DisciplinesModule } from 'src/disciplines/disciplines.module';
import { TournamentsModule } from 'src/tournaments/tournaments.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ArenasModule } from 'src/arenas/arenas.module';
import { Discipline } from 'src/disciplines/entities/discipline.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Arena } from 'src/arenas/entities/arenas.entity';
import { CompetitionCategory } from 'src/competition_categories/entities/competition_category.entity';
import { CompetitionCategoriesModule } from 'src/competition_categories/competition_categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Competition,
      Discipline,
      Tournament,
      Category,
      Arena,
      CompetitionCategory,
    ]),
    DisciplinesModule,
    TournamentsModule,
    CategoriesModule,
    ArenasModule,
    CompetitionCategoriesModule,
  ],
  controllers: [CompetitionsController],
  providers: [CompetitionsService],
  exports: [TypeOrmModule],
})
export class CompetitionsModule {}
