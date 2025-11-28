import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;
}
