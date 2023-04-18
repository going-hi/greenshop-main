import { ApiProperty } from "@nestjs/swagger";
import { CreateBlogDto } from "./dto/create-blog.dto";

export class FileUploadBlog extends CreateBlogDto{
    @ApiProperty({ type: 'string', format: 'binary' })
    preview: any;
}

