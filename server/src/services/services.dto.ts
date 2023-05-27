import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {RankDto} from "../rank/rank.dto";

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

export interface ServiceDto {
    id: number
    service: string
    price: number
    durationMin: number
    photoUrl: string
}

export interface ServiceWithRankDto extends ServiceDto {
    rank: RankDto
}