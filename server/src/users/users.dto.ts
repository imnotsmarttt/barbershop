export interface FindOneUserDto {
    [key: string]: string | number
}

export interface CreateUserDto {
    username: string;
    password: string
}

export interface CleanUserDto {
    id: number;
    username: string;
    role: string
}