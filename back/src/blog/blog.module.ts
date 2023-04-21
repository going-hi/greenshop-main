import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { FileModule } from 'src/file/file.module';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports: [
    TypeOrmModule.forFeature([BlogEntity]),
    FileModule
  ]
})
export class BlogModule {}
