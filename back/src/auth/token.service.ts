import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { TokenEntity } from "./entities/token.entity";
import { Repository } from "typeorm";
import { ACCESS_SECRET, REFRESH_SECRET } from "./auth.constants";

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @InjectRepository(TokenEntity) private readonly tokenRepository: Repository<TokenEntity>
    ){}

    generateTokens(user: UserEntity) {
        const payload = {
            id: user.id,
            email: user.email
        }

        const accessToken = this.jwtService.sign(payload, {expiresIn: '30m', secret: this.configService.get(ACCESS_SECRET)})
        const refreshToken = this.jwtService.sign(payload, {expiresIn: '30d', secret: this.configService.get(REFRESH_SECRET)})

        return {
            accessToken, refreshToken
        }
    }

    async saveToken(refreshToken: string, userId: number) {
        const token = await this.tokenRepository.findOne({
            where: {user: {id: userId}}
        })

        if(token) {
            token.refreshToken = refreshToken
            return await this.tokenRepository.save(token)
        }

        const newToken = this.tokenRepository.create({user: {id: userId}, refreshToken})
        return await this.tokenRepository.save(newToken)
    }

    async getToken(refreshToken: string) {
        const token = await this.tokenRepository.findOne({
            where: {refreshToken}
        })

        return token
    }

    async removeToken(refreshToken: string) {
        await this.tokenRepository.delete({refreshToken})
    }
}