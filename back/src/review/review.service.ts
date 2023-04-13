import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class ReviewService {

  constructor(
    @InjectRepository(ReviewEntity) private readonly reviewRepository: Repository<ReviewEntity>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService
  ) {}

  async create(userId: number, {productId, rating, text}: CreateReviewDto) {

    const product = await this.productService.getById(productId)
    if(!product) throw new NotFoundException('Product this id not found')

    const oldReview = await this.reviewRepository.findOne({
      where: {
        user: {id: userId},
        product: {id: productId}
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
      oldReview.rating = rating
      oldReview.text = text ?? null
      return await this.reviewRepository.save(oldReview)
    }

    const review = this.reviewRepository.create({
      rating, 
      user: {id: userId}, 
      product: {id: productId},
      text: text ?? null
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

  async getRatingProduct(productId: number) {
    const findOptions = {product: {id: productId}}
    const rating = await this.reviewRepository.findBy(findOptions)
    const ratingsSum = await this.reviewRepository.sum('rating', findOptions)
    return ratingsSum / rating.length
  }
}
