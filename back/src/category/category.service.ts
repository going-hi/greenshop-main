import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const oldCategory = await this.categoryRepository.findOneBy({name: createCategoryDto.name})
    if(oldCategory) throw new BadRequestException('Category with this name already exists')
    const category = this.categoryRepository.create(createCategoryDto)
    return await this.categoryRepository.save(category)
  }

  async findAll() {
    const categories = await this.categoryRepository.find()
    return categories
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({id})
    if(!category) throw new NotFoundException()
    return await this.categoryRepository.save({...category, ...updateCategoryDto})
  }

  async remove(id: number) {
    await this.categoryRepository.delete(id)
  }

  async getById(id: number) {
    return await this.categoryRepository.findOneBy({id})
  }
}
