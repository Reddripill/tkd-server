import { Module } from '@nestjs/common';
import { TournamentsArenasService } from './tournaments_arenas.service';
import { TournamentsArenasController } from './tournaments_arenas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentsArena } from './entities/tournaments_arena.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentsArena])],
  controllers: [TournamentsArenasController],
  providers: [TournamentsArenasService],
  exports: [TypeOrmModule],
})
export class TournamentsArenasModule {}
