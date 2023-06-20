import {IRank} from "rank/interfaces/rank.interface";

export interface IService {
    id: number
    service: string
    price: number
    durationMin: number
    photoUrl: string
}

export interface IServiceWithRank extends IService {
    rank: IRank
}

export interface IFindAllServicesResult {
    serviceList: IServiceWithRank[];
    itemCount: number;
    pageSize: number;
}