import {CleanUserInterface} from "users/interfaces/users.dto";

export interface TokensInterface {
    accessToken: string;
    refreshToken: string
}

export interface AuthFinishedInterface extends TokensInterface{
    user: CleanUserInterface
}

export interface JwtUserInterface {
    id: number;
    username: string;
    role: string;
    iat: number;
    exp: number
}