import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RatingEntity } from './entities/rating.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RatingService {

  constructor(
    @InjectRepository(RatingEntity) private readonly ratingRepository: Repository<RatingEntity>
  ) {}

  async create(createRatingDto: CreateRatingDto) {
    const oldRating = await this.ratingRepository.findOne({
      where: {
        user: {id: createRatingDto.userId},
        product: {id: createRatingDto.productId}
      }
    })

    if(oldRating) {
      oldRating.rating = createRatingDto.rating
      return await this.ratingRepository.save(oldRating)
    }

    const rating = this.ratingRepository.create({
      rating: createRatingDto.rating, 
      user: {id: createRatingDto.userId}, 
      product: {id: createRatingDto.productId}
    })
    return await this.ratingRepository.save(rating)
  }

  async remove(id: number) {
    await this.ratingRepository.delete(id)
  }
}
