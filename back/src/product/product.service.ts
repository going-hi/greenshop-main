import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto)
    return await this.productRepository.save(product)
  }

  async findAll(limit = 10, page = 1) {
    const products = await this.productRepository.find({
      take: limit,
      skip: limit * page - limit
    })

    return products
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id
      }
    }) 
    return product
  }

  async search(query: string) {
    const products = await this.productRepository.find({
      where: {
        name: ILike(`%${query}%`)
      }
    })

    return products
  }

  update(id: number, updateProductDto: UpdateProductDto) {
   
  }

  remove(id: number) {
    
  }
}
