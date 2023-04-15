import { IsEmail,  MaxLength, MinLength } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class UserDto {
    @ApiProperty({
        description: 'Емеил пользователя'
    })
    @IsEmail()
    email: string

    @ApiProperty({
        description: 'Пароль длинной от 8 до 30 символов'
    })
    @MinLength(8, {
        message: 'Пароль должен быть 8 или более символов',
    })
    @MaxLength(30, {
        message: 'Пароль должен быть не длинее 30 символов',
    })
    password: string
}