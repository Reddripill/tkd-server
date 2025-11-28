import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('places')
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;
}
