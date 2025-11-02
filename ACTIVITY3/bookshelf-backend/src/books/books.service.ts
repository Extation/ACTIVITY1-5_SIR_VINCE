import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookModel } from './models/create-book.model';
import { UpdateBookModel } from './models/update-book.model';
import { AuthorsService } from '../authors/authors.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    private readonly authorsService: AuthorsService,
    private readonly categoriesService: CategoriesService,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.booksRepository.find({
      relations: ['author', 'category'],
    });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['author', 'category'],
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async create(createBookModel: CreateBookModel): Promise<Book> {
    await this.authorsService.findOne(createBookModel.authorId);
    await this.categoriesService.findOne(createBookModel.categoryId);

    const newBook = this.booksRepository.create(createBookModel);
    const savedBook = await this.booksRepository.save(newBook);
    return await this.findOne(savedBook.id);
  }

  async update(id: number, updateBookModel: UpdateBookModel): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    if (updateBookModel.authorId) {
      await this.authorsService.findOne(updateBookModel.authorId);
    }

    if (updateBookModel.categoryId) {
      await this.categoriesService.findOne(updateBookModel.categoryId);
    }

    const updatedBook = { ...book, ...updateBookModel };
    await this.booksRepository.save(updatedBook);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    await this.booksRepository.remove(book);

    const count = await this.booksRepository.count();
    if (count === 0) {
      await this.dataSource.query(
        "DELETE FROM sqlite_sequence WHERE name='books'",
      );
    }

    return { message: `Book ${book.title} deleted successfully` };
  }
}
