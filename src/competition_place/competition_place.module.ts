import { Module } from '@nestjs/common';
import { CompetitionPlaceService } from './competition_place.service';
import { CompetitionPlaceController } from './competition_place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionPlace } from './entities/competition_place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompetitionPlace])],
  controllers: [CompetitionPlaceController],
  providers: [CompetitionPlaceService],
})
export class CompetitionPlaceModule {}
