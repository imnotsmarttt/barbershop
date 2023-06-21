import {InjectRepository} from "@nestjs/typeorm"
import {Repository} from "typeorm";
import {User} from "./users.entity";
import {RoleEnum} from "../role/roles.enum";
import {HttpException, HttpStatus} from "@nestjs/common";

export class UsersRepository extends Repository<User> {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }

    async getOneByIdWithError(userId: number): Promise<User> {
        const user = await this.userRepository.findOneBy({id: userId})
        if (!user) {
            throw new HttpException(`User wasn't found`, HttpStatus.NOT_FOUND)
        }
        return user
    }

    async getOneById(userId: number): Promise<User> {
        return await this.userRepository.findOneBy({id: userId})
    }

    async getOneByUsername(username: string): Promise<User> {
        return await this.userRepository.findOneBy({username})
    }

    async createUser(username: string, password: string): Promise<User> {
        const user = new User()
        user.username = username
        user.password = password
        user.role = RoleEnum.user

        await this.userRepository.save(user)
        return user
    }

    async updateUser(userId: number, data: object): Promise<User> {
        const updatedUser = await this.getOneByIdWithError(userId)
        for (const [key, value] of Object.entries(data)) {
            updatedUser[key] = value
        }
        return await this.userRepository.save(updatedUser)
    }
}
