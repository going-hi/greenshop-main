import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ACCESS_JWT_STRATEGY, ACCESS_SECRET } from "../auth.constants";

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, ACCESS_JWT_STRATEGY) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get(ACCESS_SECRET)
        })
    }

    async validate(payload: any) {
        return {}
    }
}