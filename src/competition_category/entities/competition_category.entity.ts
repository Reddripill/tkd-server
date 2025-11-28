import { Category } from 'src/categories/entities/category.entity';
import { Competition } from 'src/competitions/entities/competition.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('competition_category')
export class CompetitionCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Competition, (comp) => comp.competitionToCategories)
  @JoinColumn({ name: 'competition_id' })
  competition: Competition;

  @ManyToOne(() => Category, (category) => category.competitionToCategories)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
