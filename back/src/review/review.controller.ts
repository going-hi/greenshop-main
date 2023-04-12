import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { AccessJwtGuard } from 'src/auth/decorators/access-jwt.decorator';
import { User } from 'src/auth/decorators/user.decorator';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@AccessJwtGuard()
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  
  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Body() createReviewDto: CreateReviewDto,
    @User('id') userId: number
    ) {
    return this.reviewService.create(userId, createReviewDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) productId: number,
    @User('id') userId: number
    ) {
    return this.reviewService.remove(userId, productId);
  }

  @Get()
  getUserReviews(
    @User('id') userId: number
  ) {
    return this.reviewService.getUserReviews(userId)
  }
}
