import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorModel } from './models/create-author.model';
import { UpdateAuthorModel } from './models/update-author.model';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<Author[]> {
    return await this.authorsRepository.find();
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorsRepository.findOne({ where: { id } });
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  async create(createAuthorModel: CreateAuthorModel): Promise<Author> {
    const newAuthor = this.authorsRepository.create(createAuthorModel);
    return await this.authorsRepository.save(newAuthor);
  }

  async update(
    id: number,
    updateAuthorModel: UpdateAuthorModel,
  ): Promise<Author> {
    const author = await this.findOne(id);
    const updatedAuthor = { ...author, ...updateAuthorModel };
    return await this.authorsRepository.save(updatedAuthor);
  }

  async remove(id: number): Promise<{ message: string }> {
    const author = await this.findOne(id);
    await this.authorsRepository.remove(author);

    const count = await this.authorsRepository.count();
    if (count === 0) {
      await this.dataSource.query(
        "DELETE FROM sqlite_sequence WHERE name='authors'",
      );
    }

    return { message: `Author ${author.name} deleted successfully` };
  }
}
