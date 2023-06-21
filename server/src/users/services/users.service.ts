import {Injectable} from '@nestjs/common';

import {User} from "users/users.entity";
import {ICleanUser, ICreateUser} from "users/interfaces/users.interface";

import {UsersRepository} from "users/users.repository";
import {UsersHelperService} from "./users.helper.service";


@Injectable()
export class UsersService {
    constructor(
        private usersRepository: UsersRepository,

        private usersHelperService: UsersHelperService
    ) {
    }

    async getOne(id: number): Promise<User> {
        return await this.usersRepository.getOneById(id)
    }

    async getOneWithError(id: number): Promise<User> {
        return await this.usersRepository.getOneByIdWithError(id)
    }

    async create(data: ICreateUser): Promise<ICleanUser> {
        const createdUser = await this.usersRepository.createUser(data.username, data.password)
        return this.usersHelperService.getCleanUser(createdUser)
    }

    async update(userId: number, data: object): Promise<ICleanUser> {
        const updatedUser = await this.usersRepository.updateUser(userId, data)
        return this.usersHelperService.getCleanUser(updatedUser)
    }
}
