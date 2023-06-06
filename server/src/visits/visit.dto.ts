import {IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {Visit} from "./visit.entity";


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
    startDatetime: string

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

export interface GetAllVisitsResultDto {
    visitList: Visit[];
    visitCount: number;
    pageSize: number
}