import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpCode, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesAuth } from 'src/roles/decorators/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { ResCategory } from './category.types';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @RolesAuth(Role.ADMIN, Role.OWNER)
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({summary: 'Создание категории, доступно ролям Owner и Admin'})
  @ApiBearerAuth()
  @ApiBadRequestResponse({description: 'Категория с таким именем уже существует'})
  @ApiCreatedResponse({description: 'Успешно создано', type: ResCategory})
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({summary: 'Получение всех категорий'})
  @ApiOkResponse({description: 'Массив категорий или []', type: [ResCategory]})
  findAll() {
    return this.categoryService.findAll();
  }

  @RolesAuth(Role.ADMIN, Role.OWNER)
  @Patch(':id')
  @ApiOperation({summary: 'Изменение категории, доступно ролям Owner и Admin'})
  @ApiBearerAuth()
  @ApiOkResponse({description: 'Успешно изменено', type: ResCategory})
  @ApiNotFoundResponse({description: 'Категория с таким id не найдена'})
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @RolesAuth(Role.ADMIN, Role.OWNER)
  @Delete(':id')
  @ApiOperation({summary: 'Удаление категории, доступно ролям Owner и Admin'})
  @ApiBearerAuth()
  @ApiNoContentResponse({description: 'Успешно удалено'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
