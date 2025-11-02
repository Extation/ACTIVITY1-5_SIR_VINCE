import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryModel } from './models/create-category.model';
import { UpdateCategoryModel } from './models/update-category.model';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  async getCategory(@Param('id') id: string): Promise<Category> {
    return await this.categoriesService.findOne(Number(id));
  }

  @Post()
  async createCategory(
    @Body() createCategoryModel: CreateCategoryModel,
  ): Promise<Category> {
    return await this.categoriesService.create(createCategoryModel);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryModel: UpdateCategoryModel,
  ): Promise<Category> {
    return await this.categoriesService.update(Number(id), updateCategoryModel);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<{ message: string }> {
    return await this.categoriesService.remove(Number(id));
  }
}
