import {VisitInterface} from "../general/visit";
import {DeleteModalStateType} from "./admin";

export type AdminVisitsStateType = {
    visitList: VisitInterface[];
    visitCount: number;
    pageSize: number;

    deleteModal: DeleteModalStateType;
    fetching: 'pending' | 'succeeded';
    error: string;
}

export type AdminVisitsFetchResultType = {
    visitList: VisitInterface[];
    visitCount: number;
    pageSize: number;
}