import {HttpException, HttpStatus, Injectable} from "@nestjs/common";

import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {CleanUserInterface} from "users/interfaces/users.dto";
import {AuthHelperService} from "auth/services/auth.helper.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authHelperService: AuthHelperService
    ) {
        super()
    }

    async validate(username: string, password: string): Promise<CleanUserInterface> {
        const user = await this.authHelperService.validateUser({username, password})
        if (!user) {
            throw new HttpException('Неправильно введені дані', HttpStatus.UNAUTHORIZED) // user not found or password mismatch
        }
        return user
    }
}