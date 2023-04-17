import { ApiProperty } from "@nestjs/swagger";
import { CategoryEntity } from "src/category/entities/category.entity";
import { ReviewEntity } from "src/review/entities/review.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity('product')
export class ProductEntity extends BaseEntity {
    @ApiProperty()
    @Column()
    title: string

    @ApiProperty()
    @Column()
    description: string

    @ApiProperty()
    @Column()
    price: number

    @ApiProperty()
    @Column()
    photo: string

    @ApiProperty()
    @Column('simple-array') 
    size: string[]

    @ApiProperty()
    @OneToMany(() => ReviewEntity, review => review.product, {cascade: true})
    reviews: ReviewEntity[]

    @ApiProperty()
    @ManyToOne(() => CategoryEntity, category => category.products, {nullable: true})
    category: CategoryEntity
}
