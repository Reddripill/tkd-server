import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('competition_place')
export class CompetitionPlace {
  @PrimaryGeneratedColumn()
  id: number;
}
