import {IsNotEmpty} from "class-validator";

export class LoginBodyDto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string
}

export class RegisterBodyDto extends LoginBodyDto {
    @IsNotEmpty()
    password2: string
}