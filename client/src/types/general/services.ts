import {RankInterface} from "./rank";

export interface ServiceInterface {
    id: number;
    service: string;
    price: number;
    durationMin: number;
    photoUrl: string;
}

export interface ServiceWithRankInterface extends ServiceInterface {
    rank: RankInterface
}