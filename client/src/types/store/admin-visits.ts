import {VisitInterface} from "../general/visit";

export type AdminVisitsStateType = {
    visitList: VisitInterface[];
    visitCount: number;
    pageSize: number;

    fetching: 'pending' | 'succeeded';
    error: string;
}

export type AdminVisitsFetchResult = {
    visitList: VisitInterface[];
    visitCount: number;
    pageSize: number;
}