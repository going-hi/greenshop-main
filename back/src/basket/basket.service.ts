import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketEntity } from './entities/basket.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { BASKET_NOT_FOUND, SELECT_EXISTING_SIZE } from './error.basket.constants';
import { PRODUCT_NOT_FOUND } from 'src/product/product.error.constants';

@Injectable()
export class BasketService {

  constructor(
    @InjectRepository(BasketEntity) private readonly basketRepository: Repository<BasketEntity>,
    private readonly productService: ProductService
  ) {}

  async create(userId: number, createBasketDto: CreateBasketDto) {
    const product = await this.productService.getById(createBasketDto.productId)
    if(!product) throw new NotFoundException(PRODUCT_NOT_FOUND)

    const size = createBasketDto.size
    const productSizes = product.size

    const basketOld = await this.basketRepository.findOne({
      where: {product: {id: createBasketDto.productId}, user: {id: userId}, size},
      relations: {product: true}
    })

    if(basketOld) {
      return basketOld
    }

    if(!productSizes.includes(size)) throw new BadRequestException(SELECT_EXISTING_SIZE)

    const basket = this.basketRepository.create({user: {id: userId}, ...createBasketDto, product})
    return await this.basketRepository.save(basket)
  }

  async findAll(userId: number) {
    const baskets = await this.basketRepository.find({
      where: {user: {id: userId}},
      relations: {product: {category: true}},
      select: {id: true, count: true, size: true, product: {id: true, photo: true, description: true, price: true, title: true, category: {name: true}}}
    })

    return baskets
  }

  async findOne(id: number, userId: number) {
    const basket = await this.basketRepository.findOne({
      where: {id, user: {id: userId}},
      relations: {product: {category: true}}
    })

    if(!basket) throw new NotFoundException(BASKET_NOT_FOUND) 

    return {...basket, totalPrice: basket.count * basket.product.price}
  }

  async update(id: number, updateBasketDto: UpdateBasketDto, userId: number) {
    const basket = await this.basketRepository.findOne({
      where: {id, user: {id: userId}}
    })
    if(!basket) throw new NotFoundException(BASKET_NOT_FOUND)
    return await this.basketRepository.save({...basket, ...updateBasketDto})
  }

  async remove(id: number, userId: number) {
    await this.basketRepository.delete({id, user: {id: userId}})
  }
}
