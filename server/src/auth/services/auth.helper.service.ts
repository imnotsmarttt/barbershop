import {Injectable} from '@nestjs/common';

import {LoginBodyDto} from "auth/interfaces/auth.dto";
import {TokensInterface} from "auth/interfaces/auth.interface";
import * as bcrypt from 'bcrypt'
import {BCRYPT_SALT, JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY} from "config/config";

import {UsersService} from "users/services/users.service";
import {JwtService} from "@nestjs/jwt";
import {CleanUserInterface} from "users/interfaces/users.dto";


@Injectable()
export class AuthHelperService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async validateUser(data: LoginBodyDto): Promise<CleanUserInterface | null> {
        const {username, password} = data
        const user = await this.usersService.findOne({username})
        if (user) {
            const comparePassword = await bcrypt.compare(password, user.password)
            if (comparePassword) {
                return this.usersService.getCleanUser(user)
            }
        }
        return null
    }

    async generateTokens(payload: object): Promise<TokensInterface> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: JWT_ACCESS_SECRET_KEY,
                expiresIn: '15m'
            }),
            this.jwtService.signAsync(payload, {
                secret: JWT_REFRESH_SECRET_KEY,
                expiresIn: '7d'
            })
        ])
        return {
            accessToken,
            refreshToken
        }
    }

    async updateRefreshToken(userId: number, refreshToken: string) {
        const hashedToken = await this.hashData(refreshToken)
        await this.usersService.update(userId, {refreshToken: hashedToken})
    }

    async hashData(data: string): Promise<string> {
        return await bcrypt.hash(data, BCRYPT_SALT)
    }
}
