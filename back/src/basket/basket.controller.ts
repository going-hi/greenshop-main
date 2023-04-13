import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { AccessJwtGuard } from 'src/auth/decorators/access-jwt.decorator';
import { User } from 'src/auth/decorators/user.decorator';

@AccessJwtGuard()
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post()
  create(
    @User('id') id: number,
    @Body() createBasketDto: CreateBasketDto
  ) {
    return this.basketService.create(id, createBasketDto);
  }

  @Get()
  findAll(
    @User('id') id: number
  ) {
    return this.basketService.findAll(id);
  }

  @Get(':id')
  findOne(
    @User('id') userId: number,
    @Param('id') id: string
  ) {
    return this.basketService.findOne(+id, userId);
  }
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateBasketDto: UpdateBasketDto,
    @User('id') userId: number
  ) {
    return this.basketService.update(id, updateBasketDto, userId);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.basketService.remove(id, userId);
  }
}
