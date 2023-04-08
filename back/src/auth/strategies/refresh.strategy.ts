import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { REFRESH_SECRET, REFRESH_TOKEN_COOKIE, REFRESH__JWT_STRATEGY } from "../auth.constants";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, REFRESH__JWT_STRATEGY) {
    constructor(private readonly configService: ConfigService) {
        super({
            // * get token from cookies
            jwtFromRequest: RefreshStrategy.fromCookies,
            secretOrKey: configService.get(REFRESH_SECRET)
        })
    }

    async validate(payload) {
        return payload
    }

    static fromCookies(req: Request) {
        const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE]
        if(!refreshToken) return
        return refreshToken
    }
}