import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { ILike, Repository } from 'typeorm';
import { FileService } from 'src/file/file.service';

@Injectable()
export class BlogService {

  constructor(
    @InjectRepository(BlogEntity) private readonly blogRepository: Repository<BlogEntity>,
    private readonly fileService: FileService
  ){}

  async create(createBlogDto: CreateBlogDto, userId: number, file: Express.Multer.File) {
      const fileName = await this.fileService.saveFile(file)
      const blog = this.blogRepository.create({...createBlogDto, author: {id: userId}, preview: fileName})
      return await this.blogRepository.save(blog)
  }

  async findAll(limit: number, page: number) {
    const blogs = await this.blogRepository.findAndCount({
      take: limit, 
      skip: limit * page - limit,
      relations: {author: true}
    })
    return blogs
  }

  async findOne(id: number) {
    const blog = await this.blogRepository.findOne({
      where: {id},
      relations: {author: true}
    })
    return blog   
  }

  async search(query: string) {
    const blog = await this.blogRepository.find({
      where: {title: ILike(`%${query}%`)}
    })
    return blog
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const blog = await this.findOne(id)
    if(!blog) throw new NotFoundException()

    return await this.blogRepository.save({...blog, ...updateBlogDto})
  }

  async remove(id: number) {
    const blog = await this.findOne(id)
    if(!blog) throw new NotFoundException()
    await this.fileService.removeFile(blog.preview)
    await this.blogRepository.remove(blog)
  }
}
