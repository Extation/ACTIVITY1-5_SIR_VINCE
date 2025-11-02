import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tasks')
export class Task {
  @ApiProperty({ description: 'The unique identifier of the task' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The title of the task' })
  @Column()
  title: string;

  @ApiProperty({ description: 'The description of the task', required: false })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ description: 'Whether the task is completed', default: false })
  @Column({ default: false })
  completed: boolean;

  @ApiProperty({ description: 'The date when the task was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'The date when the task was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;
}
