import {IsNotEmpty, IsMilitaryTime} from "class-validator";

export class CreateOrUpdateBranchDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    city: string

    @IsNotEmpty()
    address: string

    @IsMilitaryTime()
    openAt: Date

    @IsMilitaryTime()
    closeAt: Date
}

export interface BranchDto {
    id: number
    name: string
    city: string
    address: string
    openAt: Date
    closeAt: Date
}
