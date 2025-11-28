import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('disciplines')
export class Discipline {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;
}
