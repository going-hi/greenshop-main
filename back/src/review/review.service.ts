import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {

  constructor(
    @InjectRepository(ReviewEntity) private readonly reviewRepository: Repository<ReviewEntity>
  ) {}

  async create(userId: number, createReviewDto: CreateReviewDto) {
    const oldReview = await this.reviewRepository.findOne({
      where: {
        user: {id: userId},
        product: {id: createReviewDto.productId}
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

    if(oldReview) {
      oldReview.rating = createReviewDto.rating
      return await this.reviewRepository.save(oldReview)
    }

    const review = this.reviewRepository.create({
      rating: createReviewDto.rating, 
      user: {id: userId}, 
      product: {id: createReviewDto.productId}
    })
    return await this.reviewRepository.save(review)
  }

  async remove(userId: number, productId: number) {
    await this.reviewRepository.delete({product: {id: productId}, user: {id: userId}})
  }

  async getUserReviews(userId: number) {
    const reviews = await this.reviewRepository.find({
      where: {user: {id: userId}},
      relations: {product: true}
    })

    return reviews
  }
}
