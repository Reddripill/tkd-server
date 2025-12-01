import { Category } from 'src/categories/entities/category.entity';
import { Discipline } from 'src/disciplines/entities/discipline.entity';
import { Place } from 'src/places/entities/place.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('competitions')
export class Competition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

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

  @ManyToOne(() => Place, (place) => place.competitions, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'place_id' })
  place?: Place;

  @ManyToOne(() => Category, (category) => category.competitions, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
