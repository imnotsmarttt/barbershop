import {IsDateString, IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString} from "class-validator";
import {BranchDto} from "../branch/branch.dto";
import {RankDto} from "../rank/rank.dto";
import {ServiceDto, ServiceWithRankDto} from "../services/services.dto";

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

export interface EmployeeDto {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    hiredFrom: Date;
    firedFrom: Date | null;
    branch: BranchDto;
    rank: RankDto;
}

export interface EmployeeFreeTime {
    start: string // date string
    availableServices: ServiceWithRankDto[]
}

export interface FindAllEmployeeResult {
    employeeList: EmployeeDto[];
    itemCount: number;
    pageSize: number;
}