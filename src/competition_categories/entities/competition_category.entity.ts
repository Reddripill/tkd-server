import { Category } from 'src/categories/entities/category.entity';
import { Competition } from 'src/competitions/entities/competition.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('competition_category')
export class CompetitionCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Competition, (competition) => competition.categories, {
    onDelete: 'CASCADE',
  })
  competition: Competition;

  @ManyToOne(() => Category, (category) => category.competitions, {
    onDelete: 'CASCADE',
    eager: true,
  })
  category: Category;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
