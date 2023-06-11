import {ServiceWithRankInterface} from "../../types/general/services";

export type AdminServicesStateType = {
    serviceList: ServiceWithRankInterface[];
    itemCount: number;
    pageSize: number;

    fetching: 'succeeded' | "pending";
    error: string;
}

export type AdminServicesFetchResult = {
    serviceList: ServiceWithRankInterface[];
    itemCount: number;
    pageSize: number;
}