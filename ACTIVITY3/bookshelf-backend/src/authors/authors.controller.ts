import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateAuthorModel } from './models/create-author.model';
import { UpdateAuthorModel } from './models/update-author.model';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  async getAllAuthors(): Promise<Author[]> {
    return await this.authorsService.findAll();
  }

  @Get(':id')
  async getAuthor(@Param('id') id: string): Promise<Author> {
    return await this.authorsService.findOne(Number(id));
  }

  @Post()
  async createAuthor(
    @Body() createAuthorModel: CreateAuthorModel,
  ): Promise<Author> {
    return await this.authorsService.create(createAuthorModel);
  }

  @Put(':id')
  async updateAuthor(
    @Param('id') id: string,
    @Body() updateAuthorModel: UpdateAuthorModel,
  ): Promise<Author> {
    return await this.authorsService.update(Number(id), updateAuthorModel);
  }

  @Delete(':id')
  async deleteAuthor(@Param('id') id: string): Promise<{ message: string }> {
    return await this.authorsService.remove(Number(id));
  }
}
