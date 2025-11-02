import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto, authorId: number): Promise<Comment> {
    const comment = this.commentsRepository.create({
      ...createCommentDto,
      authorId,
    });
    return this.commentsRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentsRepository.find({
      relations: ['author', 'post'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByPost(postId: number): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: { postId },
      relations: ['author'],
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Comment> {
    return this.commentsRepository.findOne({
      where: { id },
      relations: ['author', 'post'],
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, authorId: number): Promise<Comment> {
    await this.commentsRepository.update({ id, authorId }, updateCommentDto);
    return this.findOne(id);
  }

  async remove(id: number, authorId: number): Promise<void> {
    await this.commentsRepository.delete({ id, authorId });
  }
}
