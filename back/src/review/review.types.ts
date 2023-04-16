import { ApiProperty } from "@nestjs/swagger";



class ObjectOnlyId {
    @ApiProperty()
    id: number
}

export class Review {
    @ApiProperty({
        minimum: 1,
        maximum: 5
    })
    rating: number

    @ApiProperty({nullable: true})
    text: string

    @ApiProperty()
    createDate: Date
    
    @ApiProperty()
    updateDate: Date
}


class Product extends ObjectOnlyId {
    @ApiProperty()
    title: string

    @ApiProperty()
    description: string

    @ApiProperty()
    price: number

    @ApiProperty({description: 'Путь до фото'})
    photo: string

    @ApiProperty()
    createDate: Date
    
    @ApiProperty()
    updateDate: Date
}

export class ResReview extends Review{
    @ApiProperty({type: () => Product})
    product: Product
}


export class ResCreatedReview extends Review {
    @ApiProperty({type: () => ObjectOnlyId})
    user: ObjectOnlyId

    @ApiProperty({type: () => ObjectOnlyId})
    product: ObjectOnlyId
}