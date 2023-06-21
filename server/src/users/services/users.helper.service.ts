import {Injectable} from '@nestjs/common';

import {User} from "users/users.entity";
import {ICleanUser} from "users/interfaces/users.interface";


@Injectable()
export class UsersHelperService {
    constructor(
    ) {
    }

    getCleanUser(user: User): ICleanUser {
        const {password, refreshToken, employee, createdAt, ...cleanUser} = user
        return  cleanUser
    }
}
