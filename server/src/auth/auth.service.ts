import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import {LoginDto, RegisterDto, AuthFinishedDto, JwtUserDto} from "./auth.dto";
import * as bcrypt from 'bcrypt'
import {BCRYPT_SALT} from "../../config";

import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {CleanUserDto} from "../users/users.dto";


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

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

    async generateToken(payload: object) {
        return this.jwtService.sign(payload)
    }

    async register(data: RegisterDto): Promise<AuthFinishedDto> {
        const {username, password, password2} = data
        const userExist = await this.usersService.findOne({username})
        if (userExist) {
            throw new HttpException(`Користувач з таким ім'ям зареєстрований`, HttpStatus.CONFLICT)
        }
        if (password !== password2) {
            throw new HttpException(`Паролі не співпадають`, HttpStatus.UNAUTHORIZED)
        }
        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT)
        const user = await this.usersService.create({username, password: hashedPassword})
        const token = await this.generateToken(user)
        return {
            user,
            accessToken: token
        }
    }

    async login(data: CleanUserDto): Promise<AuthFinishedDto> {
        const token = await this.generateToken(data)
        return {
            user: data,
            accessToken: token
        }
    }

    async checkAuth(data: JwtUserDto): Promise<AuthFinishedDto> {
        const {iat, exp, ...cleanUser} = data
        const accessToken = await this.generateToken(cleanUser)
        return {
            user: cleanUser,
            accessToken
        }
    }
}
