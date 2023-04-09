import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(limit: number, page: number) {
    const products = await this.productRepository.findAndCount({
      take: limit,
      skip: limit * page - limit
    })

    return products
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id
      },
      relations: {
        ratings: true
      }
    }) 
    if(!product) throw new NotFoundException()

    let rating
    if(!product.ratings.length) {
      rating = 0
    }else {
      const ratingInt = product.ratings.map(obj => obj.rating )
      rating = ratingInt.reduce(
        (accumulator, currentValue) => accumulator + currentValue, 0 
      ) / product.ratings.length
    }
   
    delete product.ratings
    return { ...product, rating }
  }

  async search(query: string) {
    const products = await this.productRepository.find({
      where: {
        name: ILike(`%${query}%`)
      }
    })

    return products
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const oldProduct = await this.productRepository.findOneBy({id})
    if(!oldProduct) throw new NotFoundException()
    return await this.productRepository.save({...oldProduct, ...updateProductDto})
  }

  async remove(id: number) {
    await this.productRepository.delete(id)
  }
}
