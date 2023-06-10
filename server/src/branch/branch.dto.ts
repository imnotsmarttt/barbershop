import {IsNotEmpty, IsMilitaryTime} from "class-validator";

export class CreateOrUpdateBranchDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    city: string

    @IsNotEmpty()
    address: string

    @IsMilitaryTime()
    openAt: string

    @IsMilitaryTime()
    closeAt: string
}

export interface BranchDto {
    id: number
    name: string
    city: string
    address: string
    openAt: string
    closeAt: string
}

export interface FindAllBranchResultDto {
    branchList: BranchDto[];
    itemCount: number;
    pageSize: number;
}