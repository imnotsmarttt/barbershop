import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateOrUpdateServicesDto {
    @IsString()
    @IsNotEmpty()
    service: string

    @IsNotEmpty()
    price: number

    @IsNotEmpty()
    durationMin: number

    @IsNotEmpty()
    rankId: number
}