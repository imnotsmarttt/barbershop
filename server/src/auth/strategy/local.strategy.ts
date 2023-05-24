import {HttpException, HttpStatus, Injectable} from "@nestjs/common";

import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "../auth.service";
import {CleanUserDto} from "../../users/users.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService
    ) {
        super()
    }

    async validate(username: string, password: string): Promise<CleanUserDto> {
        const user = await this.authService.validateUser({username, password})
        if (!user) {
            throw new HttpException('Користувача не знайдено', HttpStatus.UNAUTHORIZED)
        }
        return user
    }
}