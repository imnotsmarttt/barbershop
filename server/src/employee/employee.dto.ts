import {IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {BranchDto} from "../branch/branchDto";
import {RankDto} from "../rank/rank.dto";

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
