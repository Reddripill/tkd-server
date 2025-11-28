import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('competition_discipline')
export class CompetitionDiscipline {
  @PrimaryGeneratedColumn()
  id: number;
}
