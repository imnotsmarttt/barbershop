import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {JWT_ACCESS_SECRET_KEY} from "../../config/config";
import {Injectable} from "@nestjs/common";

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_ACCESS_SECRET_KEY
        });
    }

    async validate(payload) {
        return payload
    }
}