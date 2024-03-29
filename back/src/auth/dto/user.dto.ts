import { ApiProperty } from "@nestjs/swagger"
import { IsEmail,  MaxLength, MinLength } from "class-validator"

export class UserDto {
    @IsEmail()
    email: string

    @MinLength(8, {
        message: 'Пароль должен быть 8 или более символов',
    })
    @MaxLength(30, {
        message: 'Пароль должен быть не длинее 30 символов',
    })
    password: string
}