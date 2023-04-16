import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { AccessJwtGuard } from 'src/auth/decorators/access-jwt.decorator';
import { User } from 'src/auth/decorators/user.decorator';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { ResCreatedReview, ResReview } from './review.types';

@ApiTags('Review')
@ApiBearerAuth()
@AccessJwtGuard()
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({summary: 'Создание отзыва'})
  @ApiBadRequestResponse({description: 'Продукт с таким id не найден'})
  @ApiCreatedResponse({description: 'Успешное создание', type: ResCreatedReview})
  create(
    @Body() createReviewDto: CreateReviewDto,
    @User('id') userId: number
  ) {
    return this.reviewService.create(userId, createReviewDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({summary: 'Удаление отзыва'})
  @ApiNoContentResponse({description: 'Успешно удалено'})
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) productId: number,
    @User('id') userId: number
  ) {
    return this.reviewService.remove(userId, productId);
  }

  @Get()
  @ApiOperation({summary: 'Получение всех отзывов пользователя'})
  @ApiOkResponse({description: 'Успешное получение', type: [ResReview]})
  getUserReviews(
    @User('id') userId: number
  ) {
    return this.reviewService.getUserReviews(userId)
  }
}
