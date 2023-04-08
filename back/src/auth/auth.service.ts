import { BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import {hash, compare} from 'bcrypt'
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepositoty: Repository<UserEntity>,
        private readonly tokenService: TokenService
    ){}

    async login(userDto: UserDto) {
        const oldUser = await this.userRepositoty.findOne({
            where: {
                email: userDto.email
            }
        })

        if(!oldUser) throw new BadRequestException('Пользователя с таким email нет')

        const isMatch = compare(userDto.password, oldUser.password)

        if(!isMatch) throw new BadRequestException('Неверный пароль')

        const tokens = this.tokenService.generateTokens(oldUser)
        await this.tokenService.saveToken(tokens.refreshToken, oldUser.id)

        return {
            user: {
                id: oldUser.id,
                email: oldUser.email
            },
            ...tokens
        }

    }

    async registration(userDto: UserDto) {
        const oldUser = await this.userRepositoty.findOne({
            where: {
                email: userDto.email
            }
        })
        if(oldUser) {
            throw new BadRequestException('Пользователь с таким email уже существует')
        }

        const hashPassword = await hash(userDto.password, 8)
        const user = this.userRepositoty.create({...userDto, password: hashPassword})
        const userSave = await this.userRepositoty.save(user)
        const tokens = this.tokenService.generateTokens(userSave)
        await this.tokenService.saveToken(tokens.refreshToken, userSave.id)

        return {
            user: {
                id: userSave.id,
                email: userSave.email
            },
            ...tokens
        }
    }   
    // * user id and his token
    async refresh(id: number, token: string){
        const refreshToken = await this.tokenService.getToken(token)
        const user = await this.userRepositoty.findOne({
            where: {id}
        })
        if(!refreshToken || !user) throw new UnauthorizedException()
        
        const tokens = this.tokenService.generateTokens(user)
        await this.tokenService.saveToken(tokens.refreshToken, id)
        
        return tokens
    }

    async logout(refreshToken: string) {
        await this.tokenService.removeToken(refreshToken)
    }

    
    
}