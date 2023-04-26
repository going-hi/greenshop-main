import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { FileModule } from 'src/file/file.module';
import { CategoryModule } from 'src/category/category.module';
import { ReviewModule } from 'src/review/review.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    FileModule,
    CategoryModule,
    forwardRef(() => ReviewModule)
  ],
  exports: [ProductService]
})
export class ProductModule {}
