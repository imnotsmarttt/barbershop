export interface ICreateUser {
    username: string;
    password: string
}

export interface ICleanUser {
    id: number;
    username: string;
    role: string;
}