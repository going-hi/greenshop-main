import { UserEntity } from "src/user/entities/user.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('blog')
export class BlogEntity extends BaseEntity {
    @Column()
    title: string

    @Column({type: 'text'})
    content: string

    @Column()
    preview: string

    @Column({default: 0})
    views: number

    @ManyToOne(() => UserEntity, author => author.blogs)
    author: UserEntity
}
