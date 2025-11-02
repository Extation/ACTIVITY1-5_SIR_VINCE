import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Author } from '../../authors/entities/author.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  authorId: number;

  @Column()
  categoryId: number;

  @Column()
  publishedYear: number;

  @Column()
  isbn: string;

  @Column()
  description: string;

  @ManyToOne(() => Author)
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
