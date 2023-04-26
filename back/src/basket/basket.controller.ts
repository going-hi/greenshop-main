import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { AccessJwtGuard } from 'src/auth/decorators/access-jwt.decorator';
import { User } from 'src/auth/decorators/user.decorator';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatedBasketDtoType } from './basket.types';


@ApiTags('Basket')
@ApiBearerAuth()
@AccessJwtGuard()
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post()
  @ApiOperation({summary: 'Добавление товара в корзину'})
  @ApiCreatedResponse({description: 'Товар успешно добавлен в корзину', type: CreatedBasketDtoType})
  @ApiNotFoundResponse({description: 'Продукт с таким id не найден'})
  @ApiBadRequestResponse({description: 'Выберите существующий размер'})
  create(
    @User('id') id: number,
    @Body() createBasketDto: CreateBasketDto
  ) {
    return this.basketService.create(id, createBasketDto);
  }


  @Get()
  @ApiOperation({summary: 'Получение всех товаров в корзине пользователя'})
  @ApiOkResponse({description: 'Успешно'})
  findAll(
    @User('id') id: number
  ) {
    return this.basketService.findAll(id);
  }

  @Get(':id')
  @ApiOperation({summary: 'Получение корзины с определенным товаром'})
  @ApiOkResponse({description: 'Успешно'})
  @ApiNotFoundResponse({description: 'Корзина с таким id у данного пользователя не найдена'})
  findOne(
    @User('id') userId: number,
    @Param('id') id: string
  ) {
    return this.basketService.findOne(+id, userId);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Изменение сущности корзины'})
  @ApiOkResponse({description: 'Успешно'})
  @ApiNotFoundResponse({description: 'Корзина с таким id у данного пользователя не найдена'})
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateBasketDto: UpdateBasketDto,
    @User('id') userId: number
  ) {
    return this.basketService.update(id, updateBasketDto, userId);
  }

  @HttpCode(HttpStatus.NOT_FOUND)
  @Delete(':id')
  @ApiOperation({summary: 'Удаление товара из корзины'})
  @ApiNoContentResponse({description: 'Успешно'})
  remove(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.basketService.remove(id, userId);
  }
}
