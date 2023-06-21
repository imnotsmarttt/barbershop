import * as bcrypt from 'bcrypt'

import {Injectable} from '@nestjs/common';

import {LoginBodyDto} from "auth/interfaces/auth.dto";
import {ITokens} from "auth/interfaces/auth.interface";
import {ICleanUser} from "users/interfaces/users.interface";


import {UsersService} from "users/services/users.service";
import {JwtService} from "@nestjs/jwt";
import {UsersHelperService} from "users/services/users.helper.service";
import {UsersRepository} from "users/users.repository";

import {BCRYPT_SALT, JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY} from "config/config";


@Injectable()
export class AuthHelperService {
    constructor(
        private readonly usersRepository: UsersRepository,

        private readonly usersService: UsersService,
        private readonly usersHelperService: UsersHelperService,
        private readonly jwtService: JwtService
    ) {
    }

    async validateUser(data: LoginBodyDto): Promise<ICleanUser | null> {
        const {username, password} = data
        const user = await this.usersRepository.getOneByUsername(username)
        if (user) {
            const comparePassword = await bcrypt.compare(password, user.password)
            if (comparePassword) {
                return this.usersHelperService.getCleanUser(user)
            }
        }
        return null
    }

    async generateTokens(payload: object): Promise<ITokens> {
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
