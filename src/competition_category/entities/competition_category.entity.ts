import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('competition_category')
export class CompetitionCategory {
  @PrimaryGeneratedColumn()
  id: number;
}
