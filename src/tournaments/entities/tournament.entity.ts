import { Competition } from 'src/competitions/entities/competition.entity';
import { TournamentsArena } from 'src/tournaments_arenas/entities/tournaments_arena.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'smallint' })
  order: number;

  @OneToMany(() => Competition, (competition) => competition.tournament, {
    eager: true,
  })
  competitions: Competition[];

  @OneToMany(() => TournamentsArena, (ta) => ta.tournament, {
    nullable: true,
    eager: true,
  })
  arenas?: TournamentsArena[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
