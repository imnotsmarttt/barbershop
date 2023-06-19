import {
    IsDateString,
    IsEmail,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString
} from "class-validator";

export class CreateOrUpdateEmployeeDto {
    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsString()
    @IsNotEmpty()
    phoneNumber: string


    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsDateString()
    @IsNotEmpty()
    hiredFrom: Date

    @IsDateString()
    @IsOptional()
    firedFrom?: Date

    @IsNotEmpty()
    branchId: number

    @IsNotEmpty()
    rankId: number

    @IsOptional()
    userId?: number
}

export class FreeVisitsParamDto {
    @IsNumberString()
    id: number

    @IsDateString()
    date: string
}