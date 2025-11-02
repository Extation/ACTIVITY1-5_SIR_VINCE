import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryModel } from './models/create-category.model';
import { UpdateCategoryModel } from './models/update-category.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async create(createCategoryModel: CreateCategoryModel): Promise<Category> {
    const newCategory = this.categoriesRepository.create(createCategoryModel);
    return await this.categoriesRepository.save(newCategory);
  }

  async update(
    id: number,
    updateCategoryModel: UpdateCategoryModel,
  ): Promise<Category> {
    const category = await this.findOne(id);
    const updatedCategory = { ...category, ...updateCategoryModel };
    return await this.categoriesRepository.save(updatedCategory);
  }

  async remove(id: number): Promise<{ message: string }> {
    const category = await this.findOne(id);
    await this.categoriesRepository.remove(category);

    const count = await this.categoriesRepository.count();
    if (count === 0) {
      await this.dataSource.query(
        "DELETE FROM sqlite_sequence WHERE name='categories'",
      );
    }

    return { message: `Category ${category.name} deleted successfully` };
  }
}
