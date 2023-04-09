import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { AccessJwtGuard } from 'src/auth/decorators/access-jwt.decorator';
import { User } from 'src/auth/decorators/user.decorator';

@AccessJwtGuard()
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}
  
  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Body() createRatingDto: CreateRatingDto,
    @User('id') userId: number
    ) {
    return this.ratingService.create(userId,createRatingDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) productId: number,
    @User('id') userId: number
    ) {
    return this.ratingService.remove(userId, productId);
  }

  @Get()
  getUserRatings(
    @User('id') userId: number
  ) {
    return this.ratingService.getUserRatings(userId)
  }
}
