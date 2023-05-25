import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

import {User} from "./users.entity";
import {CleanUserDto, CreateUserDto, FindOneUserDto} from "./users.dto";
import {RoleEnum} from "../role/roles.enum";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async getOne(query: FindOneUserDto): Promise<User> {
        return await this.usersRepository.findOne({where: query})
    }

    async create(data: CreateUserDto): Promise<CleanUserDto> {
        const createdUser = await this.usersRepository.create({...data, role: RoleEnum.user})
        await this.usersRepository.save(createdUser)
        const {password, createdAt, ...cleanUser} = createdUser
        return cleanUser
    }
}
