import { BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import {hash, compare} from 'bcrypt'
import { TokenService } from './token.service';
import { ResSuccessLogin, Tokens } from './auth.types';
import { INCORRECT_PASSWORD, USER_ALREADY_EXISTS, USER_NOT_FOUND } from './error.auth.constants';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepositoty: Repository<UserEntity>,
        private readonly tokenService: TokenService
    ){}

    async login(userDto: UserDto): Promise<ResSuccessLogin> {
        const oldUser = await this.userRepositoty.findOne({
            where: {
                email: userDto.email
            }
        })

        if(!oldUser) throw new BadRequestException(USER_NOT_FOUND)

        const isMatch = await compare(userDto.password, oldUser.password)
        if(!isMatch) throw new BadRequestException(INCORRECT_PASSWORD)

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

    async registration(userDto: UserDto): Promise<ResSuccessLogin> {
        const oldUser = await this.userRepositoty.findOne({
            where: {
                email: userDto.email
            }
        })
        if(oldUser) {
            throw new BadRequestException(USER_ALREADY_EXISTS)
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
    async refresh(id: number, token: string): Promise<Tokens> {
        const refreshToken = await this.tokenService.getToken(token)
        const user = await this.userRepositoty.findOne({
            where: {id}
        })
        if(!refreshToken || !user) throw new UnauthorizedException()
        
        const tokens = this.tokenService.generateTokens(user)
        await this.tokenService.saveToken(tokens.refreshToken, id)
        
        return tokens
    }

    async logout(refreshToken: string): Promise<void> {
        await this.tokenService.removeToken(refreshToken)
    }
}
