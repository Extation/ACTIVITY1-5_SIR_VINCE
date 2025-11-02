import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity('posts')
export class Post {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column('text')
  content: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  imageUrl?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true, default: 'Business Travel' })
  category?: string;

  @ApiProperty()
  @Column({ default: 0 })
  likes: number;

  @ApiProperty()
  @Column()
  authorId: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];
}
