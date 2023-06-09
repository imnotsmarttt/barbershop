import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

import {User} from "./users.entity";
import {CleanUserDto, CreateUserDto} from "./users.dto";
import {RoleEnum} from "../role/roles.enum";
import {FindOneQueryDto} from "../config/general.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {
    }

    getCleanUser(user: User): CleanUserDto {
        const {password, refreshToken, employee, createdAt, ...cleanUser} = user
        return  cleanUser
    }

    async findOne(query: FindOneQueryDto): Promise<User> {
        return await this.usersRepository.findOneBy(query)
    }

    // controller utils
    async findOneWithError(query: FindOneQueryDto): Promise<User> {
        const user = await this.usersRepository.findOneBy(query)
        if (!user) {
            throw new HttpException('Користувача не знайдено', HttpStatus.NOT_FOUND) // user not found
        }
        return user
    }

    async create(data: CreateUserDto): Promise<CleanUserDto> {
        const createdUser = await this.usersRepository.create({...data, role: RoleEnum.user})
        await this.usersRepository.save(createdUser)
        return this.getCleanUser(createdUser)
    }

    async update(userId: number, data: object): Promise<CleanUserDto> {
        const user = await this.findOneWithError({id: userId})
        for (const [key, value] of Object.entries(data)) {
            user[key] = value
        }
        await this.usersRepository.save(user)
        return this.getCleanUser(user)
    }
}
