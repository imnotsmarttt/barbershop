import {IsNotEmpty, IsString} from "class-validator";
import {IRank} from "../../rank/interfaces/rank.interface";

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