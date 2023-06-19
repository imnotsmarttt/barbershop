import {RankInterface} from "rank/interfaces/rank.interface";

export interface ServiceInterface {
    id: number
    service: string
    price: number
    durationMin: number
    photoUrl: string
}

export interface ServiceWithRankInterface extends ServiceInterface {
    rank: RankInterface
}

export interface FindAllServicesResultInterface {
    serviceList: ServiceWithRankInterface[];
    itemCount: number;
    pageSize: number;
}