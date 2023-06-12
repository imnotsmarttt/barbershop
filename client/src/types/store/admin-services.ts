import {ServiceWithRankInterface} from "types/general/services";
import {DeleteModalStateType} from "./admin";

export type AdminServicesStateType = {
    serviceList: ServiceWithRankInterface[];
    itemCount: number;
    pageSize: number;

    deleteModal: DeleteModalStateType
    fetching: 'succeeded' | "pending";
    error: string;
}

export type AdminServicesFetchResult = {
    serviceList: ServiceWithRankInterface[];
    itemCount: number;
    pageSize: number;
}