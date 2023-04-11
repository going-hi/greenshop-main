import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, ParseIntPipe, HttpCode, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RolesAuth } from 'src/roles/decorators/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('filter') 
  filter(
    @Query('from') from = 0,
    @Query('to') to: string
  ) {
    return this.productService.filter(+from, +to)
  } 


  @RolesAuth(Role.ADMIN, Role.OWNER)
  @Post()
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo'))
  create(
    @UploadedFile( 
      new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: 'image/jpeg' }),
      ],
    }),) file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto, file);
  }

  @Get()
  findAll(
    @Query('limit') limit = 10,
    @Query('page') page = 1
  ) {
    return this.productService.findAll(+limit, +page);
  }

  @Get('search')
  search(@Query('query') query: string) {
    return this.productService.search(query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @RolesAuth(Role.ADMIN)
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @RolesAuth(Role.ADMIN)
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }

  
}
