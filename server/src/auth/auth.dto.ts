import {IsNotEmpty} from "class-validator";
import {CleanUserDto} from "../users/users.dto";

export class LoginDto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string
}

export class RegisterDto extends LoginDto {
    @IsNotEmpty()
    password2: string
}

export interface AuthFinishedDto {
    user: CleanUserDto
    accessToken: string
}

export interface JwtUserDto {
    id: number;
    username: string;
    role: string;
    iat: number;
    exp: number
}