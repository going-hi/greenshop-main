import { ApiProperty } from "@nestjs/swagger"

export class ResCategory {
    @ApiProperty()
    name: string

    @ApiProperty()
    id: number

    @ApiProperty()
    createDate: Date
    
    @ApiProperty()
    updateDate: Date
}