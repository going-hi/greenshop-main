import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RatingEntity } from './entities/rating.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RatingService {

  constructor(
    @InjectRepository(RatingEntity) private readonly ratingRepository: Repository<RatingEntity>
  ) {}

  async create(userId: number, createRatingDto: CreateRatingDto) {
    const oldRating = await this.ratingRepository.findOne({
      where: {
        user: {id: userId},
        product: {id: createRatingDto.productId}
      },
      relations: {
        user: true,
        product: true
      },
      select: {
        user: {id: true},
        product: {id: true}
      }
    })

    if(oldRating) {
      oldRating.rating = createRatingDto.rating
      return await this.ratingRepository.save(oldRating)
    }

    const rating = this.ratingRepository.create({
      rating: createRatingDto.rating, 
      user: {id: userId}, 
      product: {id: createRatingDto.productId}
    })
    return await this.ratingRepository.save(rating)
  }

  async remove(userId: number, productId: number) {
    await this.ratingRepository.delete({product: {id: productId}, user: {id: userId}})
  }

  async getUserRatings(userId: number) {
    const ratings = await this.ratingRepository.find({
      where: {user: {id: userId}},
      relations: {product: true}
    })

    return ratings
  }
}
