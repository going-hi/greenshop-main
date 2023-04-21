import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, UsePipes, ValidationPipe, Query, ParseIntPipe } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiBody, ApiConsumes, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RolesAuth } from 'src/roles/decorators/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/auth/decorators/user.decorator';
import { FileUploadBlog } from './blog.types';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService
  ) {}

  @RolesAuth(Role.ADMIN, Role.OWNER)
  @UseInterceptors(FileInterceptor('preview'))
  @UsePipes(new ValidationPipe())
  @ApiOperation({summary: 'Создание товара'})
  @ApiConsumes('multipart/form-data')
  @ApiBody({type: FileUploadBlog})
  @Post()
  create(
    @UploadedFile( 
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/jpeg' })
        ]
      })
    ) file: Express.Multer.File,
    @Body() createBlogDto: CreateBlogDto,
    @User('id') id: number
  ) {
    return this.blogService.create(createBlogDto, id, file);
  }

  @Get()
  @ApiOperation({summary: 'Получение всех товаров'})
  @ApiQuery({name: 'limit', type: 'number',  required: false, description: 'Необязательно, базовое значение 10'})
  @ApiQuery({name: 'page', type: 'number',  required: false, description: 'Необязательно, базовое значение 1'})
  @ApiOkResponse({description: 'Получение массива [Blog[], count]'})
  findAll(
    @Query('limit') limit = 10,
    @Query('page') page = 1
  ) {
    return this.blogService.findAll(limit, page);
  }

  @Get('search')
  @ApiOperation({summary: 'Поиск блога по title'})
  @ApiOkResponse({description: 'Получение массива блогов'})
  search(
    @Query('query') query: string
  ) {
    return this.blogService.search(query)
  }

  @Get(':id')
  @ApiOperation({summary: 'Получение блога по id'})
  @ApiOkResponse({description: 'Успешное получение блога или пустой объект'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Редактирование объекта'})
  @ApiOkResponse({description: 'Успешно изменено'})
  @ApiNotFoundResponse({description: 'Блог с таким id не найден'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({summary: 'Удаление товара'})
  @ApiNoContentResponse({description: 'Успешно удалено'})
  @ApiNotFoundResponse({description: 'Блог с таким id не найден'})
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.remove(id);
  }
}
