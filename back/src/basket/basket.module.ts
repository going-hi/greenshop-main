import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketEntity } from './entities/basket.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [
    TypeOrmModule.forFeature([BasketEntity]),
    ProductModule
  ]
})
export class BasketModule {}
