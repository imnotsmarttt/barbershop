import {ICleanUser} from "users/interfaces/users.interface";

export interface ITokens {
    accessToken: string;
    refreshToken: string
}

export interface IAuthFinished extends ITokens{
    user: ICleanUser
}

export interface IJwtUser {
    id: number;
    username: string;
    role: string;
    iat: number;
    exp: number
}