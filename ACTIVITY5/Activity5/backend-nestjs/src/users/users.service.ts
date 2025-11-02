import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ['id', 'username', 'email', 'createdAt', 'updatedAt'],
    });
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      select: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt'],
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  async getUserActivity(id: number): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['posts', 'comments', 'comments.post'],
      select: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      return null;
    }

    // Combine posts and comments into a single activity array
    const activities = [];

    // Add posts to activities
    if (user.posts) {
      user.posts.forEach(post => {
        activities.push({
          type: 'post',
          id: post.id,
          title: post.title,
          content: post.content,
          imageUrl: post.imageUrl,
          category: post.category,
          likes: post.likes,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        });
      });
    }

    // Add comments to activities
    if (user.comments) {
      user.comments.forEach(comment => {
        activities.push({
          type: 'comment',
          id: comment.id,
          content: comment.content,
          postId: comment.postId,
          postTitle: comment.post?.title,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        });
      });
    }

    // Sort activities by creation date (newest first)
    activities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      activities,
    };
  }
}
