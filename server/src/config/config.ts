require('dotenv').config()

//DataBase
export const DB_NAME: string = process.env.DB_NAME
export const DB_PASSWORD: string = process.env.DB_PASSWORD
export const DB_HOST: string = process.env.DB_HOST
export const DB_PORT: number = parseInt(process.env.DB_PORT)
export const DB_USERNAME: string = process.env.DB_USERNAME

//Auth
export const BCRYPT_SALT: number = parseInt(process.env.BCRYPT_SALT)
export const JWT_ACCESS_SECRET_KEY: string = process.env.JWT_ACCESS_SECRET_KEY
export const JWT_REFRESH_SECRET_KEY: string = process.env.JWT_REFRESH_SECRET_KEY
