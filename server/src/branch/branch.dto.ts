import {IsNotEmpty, IsMilitaryTime} from "class-validator";

export class CreateBranchDto {
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
export class UpdateBranchDto {
    @IsNotEmpty()
    name?: string

    @IsNotEmpty()
    city?: string

    @IsNotEmpty()
    address?: string

    @IsMilitaryTime()
    openAt?: Date

    @IsMilitaryTime()
    closeAt?: Date
}

export interface FindOneBranchDto {
    [key: string]: string | number
}