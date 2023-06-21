import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import {RegisterBodyDto} from "auth/interfaces/auth.dto";
import {IAuthFinished} from "auth/interfaces/auth.interface";
import * as bcrypt from 'bcrypt'

import {UsersService} from "users/services/users.service";
import {ICleanUser} from "users/interfaces/users.interface";
import {AuthHelperService} from "./auth.helper.service";
import {UsersHelperService} from "users/services/users.helper.service";
import {UsersRepository} from "users/users.repository";


@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,

        private usersService: UsersService,
        private usersHelperService: UsersHelperService,
        private authHelperService: AuthHelperService
    ) {
    }

    // controller utils
    async register(data: RegisterBodyDto): Promise<IAuthFinished> {
        const {username, password, password2} = data
        const userExist = await this.usersRepository.getOneByUsername(username)
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

    async login(data: ICleanUser): Promise<IAuthFinished> {
        const tokens = await this.authHelperService.generateTokens(data)
        await this.authHelperService.updateRefreshToken(data.id, tokens.refreshToken)

        return {
            user: data,
            ...tokens
        }
    }

    async logout(userId: number): Promise<ICleanUser> {
        return await this.usersService.update(userId, {refreshToken: null})
    }

    async refreshTokens(userId: number, token: string): Promise<IAuthFinished> {
        const user = await this.usersRepository.getOneById(userId)
        if (!user || !user.refreshToken) {
            throw new HttpException('Дозвіл заборонено', HttpStatus.UNAUTHORIZED) // Access denied
        }
        const compareTokens = await bcrypt.compare(token, user.refreshToken)
        if (!compareTokens) {
            throw new HttpException('Дозвіл заборонено', HttpStatus.UNAUTHORIZED) // Access denied
        }

        const cleanUser = this.usersHelperService.getCleanUser(user)
        const tokens = await this.authHelperService.generateTokens(cleanUser)
        await this.authHelperService.updateRefreshToken(cleanUser.id, tokens.refreshToken)

        return {
            user: cleanUser,
            ...tokens
        }
    }
}
