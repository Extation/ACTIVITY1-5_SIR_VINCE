/**
 * Service class handling CRUD operations for blog posts in the NestJS backend.
 * Provides methods for creating, reading, updating, and deleting posts,
 * including pagination and author-based access control.
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, authorId: number, imageUrl?: string): Promise<Post> {
    const post = this.postsRepository.create({
      ...createPostDto,
      authorId,
      imageUrl,
    });
    return this.postsRepository.save(post);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [posts, total] = await this.postsRepository.findAndCount({
      relations: ['author', 'comments'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: posts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Post> {
    return this.postsRepository.findOne({
      where: { id },
      relations: ['author', 'comments', 'comments.author'],
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto, authorId: number, imageUrl?: string, userRole?: string): Promise<Post> {
    const updateData: any = { ...updatePostDto };
    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }
    
    // Admins can update any post, regular users can only update their own posts
    if (userRole === 'admin') {
      await this.postsRepository.update({ id }, updateData);
    } else {
      await this.postsRepository.update({ id, authorId }, updateData);
    }
    
    return this.findOne(id);
  }

  async remove(id: number, authorId: number): Promise<void> {
    await this.postsRepository.delete({ id, authorId });
  }

  async likePost(id: number, userId: number): Promise<Post> {
    const post = await this.findOne(id);
    if (post) {
      post.likes += 1;
      return this.postsRepository.save(post);
    }
    return post;
  }
}
