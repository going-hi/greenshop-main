import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, ParseIntPipe, HttpCode, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RolesAuth } from 'src/roles/decorators/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { SetCategoryDto } from './dto/set-category.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreatedProduct, FileUpload } from './product.types';
import { ProductEntity } from './entities/product.entity';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('filter')
  @ApiOperation({summary: 'Фильтрация товара по цене'})
  @ApiQuery({name: 'from',  required: false, type: Number})
  @ApiQuery({name: 'to',  required: false, type: Number})
  @ApiOkResponse({description: 'Получение фильтрованного значения или []'})
  filter(
    @Query('from') from = 0,
    @Query('to') to: string
  ) {
    return this.productService.filter(+from, +to)
  } 

  @RolesAuth(Role.ADMIN, Role.OWNER)
  @Post()
  @UsePipes(new ValidationPipe({transform: true}))
  @UseInterceptors(FileInterceptor('photo'))
  @ApiOperation({summary: 'Создание товара, доступно ролям Admin и Owner'})
  @ApiCreatedResponse({description: 'Получение созданного товара', type: CreatedProduct})
  @ApiConsumes('multipart/form-data')
  @ApiBody({type: FileUpload})
  create(
    @UploadedFile( 
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      })
    ) file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto, file);
  }

  @Get()
  @ApiOperation({summary: 'Получение всех товаров'})
  @ApiQuery({name: 'limit', type: 'number',  required: false, description: 'Необязательно, базовое значение 10'})
  @ApiQuery({name: 'page', type: 'number',  required: false, description: 'Необязательно, базовое значение 1'})
  findAll(
    @Query('limit') limit = 10,
    @Query('page') page = 1
  ) {
    return this.productService.findAll(+limit, +page);
  }

  @Get('category/:id')
  @ApiOperation({summary: 'Получения всех товаров категории'})
  @ApiQuery({name: 'limit', type: Number, required: false,  description: 'Необязательно, базовое значение 10'})
  @ApiQuery({name: 'page', type: Number, required: false, description: 'Необязательно, базовое значение 1'})
  getProductsByCategory(
    @Param('id', ParseIntPipe) id: number,
    @Query('limit') limit = 10,
    @Query('page') page = 1
  ) {
    return this.productService.getProductsByCategory(id, limit, page)
  }

  @RolesAuth(Role.ADMIN, Role.OWNER)
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post('category')
  @ApiOperation({summary: 'Установка категории для продукта, доступно ролям Admin и Owner'})
  @ApiBearerAuth()
  @ApiOkResponse({description: 'Получение измененного объекта', })
  @ApiNotFoundResponse({description: 'Товар с таким id не найден'})
  @ApiNotFoundResponse({description: 'Категория с таким id не найдена'})
  setCategory(@Body() {productId, categoryId}: SetCategoryDto) {
    return this.productService.setCategory(productId, categoryId)
  }

  @Get('search')
  @ApiOperation({summary: 'Поиск товара по названию'})
  search(@Query('query') query: string) {
    return this.productService.search(query)
  }

  @Get(':id')
  @ApiOperation({summary: 'Получение товара по айди'})
  @ApiOkResponse({description: 'Получение продукта', type: ProductEntity})
  @ApiNotFoundResponse({description: 'Продукт с таким id не найден'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @RolesAuth(Role.ADMIN, Role.OWNER)
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  @ApiOperation({summary: 'Изменение продукта, доступно ролям Admin и Owner'})
  @ApiOkResponse({description: 'Успешно изменено', type: ProductEntity})
  @ApiNotFoundResponse({description: 'Продукт с таким id не найден'})
  @ApiBearerAuth()
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @RolesAuth(Role.ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({summary: 'Удаление продукта, доступно Admin и Owner'})
  @ApiNoContentResponse({description: 'Успешно удалено'})
  @ApiBearerAuth()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }  
}
