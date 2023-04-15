import { ApiProperty } from "@nestjs/swagger"

export class Tokens {
    @ApiProperty()
    accessToken: string

    @ApiProperty()
    refreshToken: string

}
class User {
    @ApiProperty()
    email: string
    @ApiProperty()
    id: number
}
export class ResSuccessLogin extends Tokens {
    @ApiProperty({type: () => User})
    user: User
}

