import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import {RegisterBodyDto} from "auth/interfaces/auth.dto";
import {AuthFinishedInterface} from "auth/interfaces/auth.interface";
import * as bcrypt from 'bcrypt'

import {UsersService} from "users/services/users.service";
import {CleanUserInterface} from "users/interfaces/users.dto";
import {AuthHelperService} from "./auth.helper.service";


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private authHelperService: AuthHelperService
    ) {
    }

    // controller utils
    async register(data: RegisterBodyDto): Promise<AuthFinishedInterface> {
        const {username, password, password2} = data
        const userExist = await this.usersService.findOne({username})
        if (userExist) {
            throw new HttpException(`Користувач з таким ім'ям зареєстрований`, HttpStatus.CONFLICT) // user with this username exist
        }
        if (password !== password2) {
            throw new HttpException(`Паролі не співпадають`, HttpStatus.UNAUTHORIZED) // password mismatch
        }
        const hashedPassword = await this.authHelperService.hashData(password)
        const user = await this.usersService.create({username, password: hashedPassword})
        const tokens = await this.authHelperService.generateTokens(user)
        await this.authHelperService.updateRefreshToken(user.id, tokens.refreshToken)

        return {
            user,
            ...tokens
        }
    }

    async login(data: CleanUserInterface): Promise<AuthFinishedInterface> {
        const tokens = await this.authHelperService.generateTokens(data)
        await this.authHelperService.updateRefreshToken(data.id, tokens.refreshToken)

        return {
            user: data,
            ...tokens
        }
    }

    async logout(userId: number): Promise<CleanUserInterface> {
        return await this.usersService.update(userId, {refreshToken: null})
    }

    async refreshTokens(userId: number, token: string): Promise<AuthFinishedInterface> {
        const user = await this.usersService.findOne({id: userId})
        if (!user || !user.refreshToken) {
            throw new HttpException('Дозвіл заборонено', HttpStatus.UNAUTHORIZED) // Access denied
        }
        const compareTokens = await bcrypt.compare(token, user.refreshToken)
        if (!compareTokens) {
            throw new HttpException('Дозвіл заборонено', HttpStatus.UNAUTHORIZED) // Access denied
        }

        const cleanUser = this.usersService.getCleanUser(user)
        const tokens = await this.authHelperService.generateTokens(cleanUser)
        await this.authHelperService.updateRefreshToken(cleanUser.id, tokens.refreshToken)

        return {
            user: cleanUser,
            ...tokens
        }
    }
}
