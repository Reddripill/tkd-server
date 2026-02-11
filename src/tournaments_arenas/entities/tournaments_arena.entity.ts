import { Arena } from 'src/arenas/entities/arenas.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tournaments_arena')
export class TournamentsArena {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tournament, (tournament) => tournament.arenas, {
    onDelete: 'CASCADE',
  })
  tournament: Tournament;

  @ManyToOne(() => Arena, (arena) => arena.tournaments, {
    onDelete: 'CASCADE',
    eager: true,
  })
  arena: Arena;

  @Column({ type: 'smallint' })
  order: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
