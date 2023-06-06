import {VisitInterface} from "../visit-types";

// visits
export type AdminVisitsStateType = {
    visitList: VisitInterface[];
    visitCount: number;
    pageSize: number;
}

export type  AdminStateType = {
    visits: AdminVisitsStateType
    fetching: 'pending' | 'succeeded';
    error: string;
}