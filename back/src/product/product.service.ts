import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Between, ILike, Repository } from 'typeorm';
import { FileService } from 'src/file/file.service';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    private readonly fileService: FileService,
    private readonly categoryService: CategoryService
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
        reviews: true
      }
    }) 
    if(!product) throw new NotFoundException()

    let rating
    if(!product.reviews.length) {
      rating = 0
    }else {
      const ratingInt = product.reviews.map(obj => obj.rating )
      rating = ratingInt.reduce(
        (accumulator, currentValue) => accumulator + currentValue, 0 
      ) / product.reviews.length
    }
   
    delete product.reviews
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


  async getProductsByCategory(categoryId: number, limit: number, page: number) {
    const products = await this.productRepository.findAndCount({
      where: {
        category: {id: categoryId}
      },
      take: limit,
      skip: page * limit - limit
    })

    return products
  }

  async setCategory(productId: number, categoryId: number) {
    const category = await this.categoryService.getById(categoryId)
    if(!category) throw new NotFoundException('Category with this id not found')

    const product = await this.productRepository.findOneBy({id: productId})
    if(!product) throw new NotFoundException('Product with this id not found')

    product.category = category

    return await this.productRepository.save(product)
  }
}
