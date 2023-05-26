import {IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";


export class CreateOrUpdateVisitDto {
    @IsNotEmpty()
    @IsString()
    fullName: string

    @IsNotEmpty()
    @IsString()
    phoneNumber: string

    @IsOptional()
    @IsEmail()
    email: string

    @IsDateString()
    @IsNotEmpty()
    startDate: Date

    @IsNotEmpty()
    employeeId: number

    @IsNotEmpty()
    serviceId: number
}

export enum VisitStatusEnumDto {
    end = 'END',
    canceled = 'CANCELED',
    notStarted = 'NOT_STARTED'
}