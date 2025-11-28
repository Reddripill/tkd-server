import { CompetitionCategory } from 'src/competition_category/entities/competition_category.entity';
import { Discipline } from 'src/disciplines/entities/discipline.entity';
import { Place } from 'src/places/entities/place.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('competitions')
export class Competition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @ManyToOne(() => Tournament, (tournament) => tournament.competitions)
  @JoinColumn({ name: 'tournament_id' })
  tournament: Tournament;

  @ManyToOne(() => Discipline, (discipline) => discipline.competitions)
  @JoinColumn({ name: 'discipline_id' })
  discipline: Discipline;

  @ManyToOne(() => Place, (place) => place.competitions)
  @JoinColumn({ name: 'place_id' })
  place: Place;

  @OneToMany(() => CompetitionCategory, (compToCat) => compToCat.competition)
  competitionToCategories: CompetitionCategory[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
