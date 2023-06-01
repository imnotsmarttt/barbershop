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

    async findOne(query: FindOneQueryDto): Promise<User> {
        return await this.usersRepository.findOneBy(query)
    }

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
        const {password, createdAt, ...cleanUser} = createdUser
        return cleanUser
    }
}
