import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { FileModule } from 'src/file/file.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    FileModule,
    CategoryModule
  ],
  exports: [ProductService]
})
export class ProductModule {}
