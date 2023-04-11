import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Between, ILike, LessThan, Repository } from 'typeorm';
import { FileService } from 'src/file/file.service';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    private readonly fileService: FileService
  ) {}

  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    const fileName = await this.fileService.saveFile(file)
    const product = this.productRepository.create({...createProductDto, photo: fileName})
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
        title: ILike(`%${query}%`)
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
    const product = await this.productRepository.findOneBy({id})
    if(!product) throw new NotFoundException()

    await this.fileService.removeFile(product.photo)
    await this.productRepository.remove(product)
  }

  async filter(fromPrice: number, toPrice = NaN) {
    
    let price;

    if(isNaN(toPrice)) {
      const productMaxPrice = await this.productRepository.find({
        order: { price: 'DESC'}
      })
      
      const maxPrice = productMaxPrice[0].price
      console.log(maxPrice)
      price = Between(fromPrice, maxPrice)
    }else {
      price = Between(fromPrice, toPrice)
    }


    const products = await this.productRepository.findAndCount({
      where: {price}
    })
    return products
  }
}
