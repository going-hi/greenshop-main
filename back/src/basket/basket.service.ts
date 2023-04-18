import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketEntity } from './entities/basket.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class BasketService {

  constructor(
    @InjectRepository(BasketEntity) private readonly basketRepository: Repository<BasketEntity>,
    private readonly productService: ProductService
  ) {}

  async create(userId: number, createBasketDto: CreateBasketDto) {
    const product = await this.productService.getById(createBasketDto.productId)
    if(!product) throw new NotFoundException('Product this id not found')

    const size = createBasketDto.size
    const productSizes = product.size

    const basketOld = await this.basketRepository.findOne({
      where: {product: {id: createBasketDto.productId}, user: {id: userId}, size},
      relations: {product: true}
    })

    if(basketOld) {
      return basketOld
    }

    if(!productSizes.includes(size)) throw new BadRequestException('Select an existing size')

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

    if(!basket) throw new NotFoundException('Basket this id not found') 

    return {...basket, totalPrice: basket.count * basket.product.price}
  }

  async update(id: number, updateBasketDto: UpdateBasketDto, userId: number) {
    const basket = await this.basketRepository.findOne({
      where: {id, user: {id: userId}}
    })
    if(!basket) throw new NotFoundException('Basket not found')
    return await this.basketRepository.save({...basket, ...updateBasketDto})
  }

  async remove(id: number, userId: number) {
    await this.basketRepository.delete({id, user: {id: userId}})
  }
}
