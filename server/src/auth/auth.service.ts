import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import {LoginDto, RegisterDto, AuthFinishedDto, JwtUserDto, TokensDto} from "./auth.dto";
import * as bcrypt from 'bcrypt'
import {BCRYPT_SALT, JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY} from "../config/config";


import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {CleanUserDto} from "../users/users.dto";


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async validateUser(data: LoginDto): Promise<CleanUserDto | null> {
        const {username, password} = data
        const user = await this.usersService.findOne({username})
        if (user) {
            const comparePassword = await bcrypt.compare(password, user.password)
            if (comparePassword) {
                const {password, createdAt, ...cleanUser} = user
                return cleanUser
            }
        }
        return null
    }

    async generateTokens(payload: object): Promise<TokensDto> {
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

    // controller services
    async register(data: RegisterDto): Promise<AuthFinishedDto> {
        const {username, password, password2} = data
        const userExist = await this.usersService.findOne({username})
        if (userExist) {
            throw new HttpException(`Користувач з таким ім'ям зареєстрований`, HttpStatus.CONFLICT) // user with this username exist
        }
        if (password !== password2) {
            throw new HttpException(`Паролі не співпадають`, HttpStatus.UNAUTHORIZED) // password mismatch
        }
        const hashedPassword = await this.hashData(password)
        const user = await this.usersService.create({username, password: hashedPassword})
        const tokens = await this.generateTokens(user)
        await this.updateRefreshToken(user.id, tokens.refreshToken)

        return {
            user,
            ...tokens
        }
    }

    async login(data: CleanUserDto): Promise<AuthFinishedDto> {
        const tokens = await this.generateTokens(data)
        await this.updateRefreshToken(data.id, tokens.refreshToken)

        return {
            user: data,
            ...tokens
        }
    }

    async logout(userId: number): Promise<CleanUserDto> {
        return await this.usersService.update(userId, {refreshToken: null})
    }

    async refreshTokens(userId: number, token: string): Promise<AuthFinishedDto> {
        const user = await this.usersService.findOne({id: userId})
        if (!user || !user.refreshToken) {
            throw new HttpException('Дозвіл заборонено', HttpStatus.UNAUTHORIZED) // Access denied
        }
        const compareTokens = await bcrypt.compare(token, user.refreshToken)
        if (!compareTokens) {
            throw new HttpException('Дозвіл заборонено', HttpStatus.UNAUTHORIZED) // Access denied
        }
        const {password, createdAt, refreshToken, employee, ...cleanUser } = user
        const tokens = await this.generateTokens(cleanUser)

        return {
            user: cleanUser,
            ...tokens
        }
    }
}
