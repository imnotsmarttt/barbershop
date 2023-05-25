import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateOrUpdateRankDto {
    @IsString()
    @IsNotEmpty()
    rank: string

    @IsNumber()
    @IsNotEmpty()
    salaryPercent: number
}


export interface RankDto {
    id: number;
    rank: string;
    salaryPercent: number
}