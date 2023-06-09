import {UserType} from "../general/auth";

export interface Auth {
    isAuth: boolean
    accessToken: string | null,
    refreshToken: string | null,
    user: UserType | null,
    fetching: 'pending' | 'succeeded',
    error: string
}

export interface AuthSuccessActionType {
    accessToken: string,
    refreshToken: string,
    user: UserType
}