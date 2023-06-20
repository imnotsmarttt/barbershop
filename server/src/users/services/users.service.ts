import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

import {User} from "users/users.entity";
import {ICleanUser, ICreateUser} from "users/interfaces/users.interface";
import {RoleEnum} from "role/roles.enum";
import {IFindOneQuery} from "common/common.interface";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {
    }

    getCleanUser(user: User): ICleanUser {
        const {password, refreshToken, employee, createdAt, ...cleanUser} = user
        return  cleanUser
    }

    async findOne(query: IFindOneQuery): Promise<User> {
        return await this.usersRepository.findOneBy(query)
    }

    // controller utils
    async findOneWithError(query: IFindOneQuery): Promise<User> {
        const user = await this.usersRepository.findOneBy(query)
        if (!user) {
            throw new HttpException('Користувача не знайдено', HttpStatus.NOT_FOUND) // user not found
        }
        return user
    }

    async create(data: ICreateUser): Promise<ICleanUser> {
        const createdUser = await this.usersRepository.create({...data, role: RoleEnum.user})
        await this.usersRepository.save(createdUser)
        return this.getCleanUser(createdUser)
    }

    async update(userId: number, data: object): Promise<ICleanUser> {
        const user = await this.findOneWithError({id: userId})
        for (const [key, value] of Object.entries(data)) {
            user[key] = value
        }
        await this.usersRepository.save(user)
        return this.getCleanUser(user)
    }
}
