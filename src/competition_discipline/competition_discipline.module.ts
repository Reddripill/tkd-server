import { Module } from '@nestjs/common';
import { CompetitionDisciplineService } from './competition_discipline.service';
import { CompetitionDisciplineController } from './competition_discipline.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionDiscipline } from './entities/competition_discipline.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompetitionDiscipline])],
  controllers: [CompetitionDisciplineController],
  providers: [CompetitionDisciplineService],
})
export class CompetitionDisciplineModule {}
