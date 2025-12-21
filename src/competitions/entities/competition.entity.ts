import { Discipline } from 'src/disciplines/entities/discipline.entity';
import { Arena } from 'src/arenas/entities/arenas.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CompetitionCategory } from 'src/competition_categories/entities/competition_category.entity';

@Entity('competitions')
export class Competition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tournament, (tournament) => tournament.competitions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tournament_id' })
  tournament: Tournament;

  @ManyToOne(() => Discipline, (discipline) => discipline.competitions, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'discipline_id' })
  discipline?: Discipline;

  @ManyToOne(() => Arena, (arena) => arena.competitions, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'arena_id' })
  arena?: Arena;

  @OneToMany(() => CompetitionCategory, (cc) => cc.competition, {
    nullable: true,
  })
  categories?: CompetitionCategory[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
