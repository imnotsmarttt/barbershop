import {IsNotEmpty, IsMilitaryTime} from "class-validator";

export class CreateOrUpdateBranchBodyDto {
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