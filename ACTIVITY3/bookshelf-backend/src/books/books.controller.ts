import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookModel } from './models/create-book.model';
import { UpdateBookModel } from './models/update-book.model';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return await this.booksService.findAll();
  }

  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book> {
    return await this.booksService.findOne(Number(id));
  }

  @Post()
  async createBook(@Body() createBookModel: CreateBookModel): Promise<Book> {
    return await this.booksService.create(createBookModel);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookModel: UpdateBookModel,
  ): Promise<Book> {
    return await this.booksService.update(Number(id), updateBookModel);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<{ message: string }> {
    return await this.booksService.remove(Number(id));
  }
}
