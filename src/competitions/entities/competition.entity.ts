import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('competitions')
export class Competition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;
}
