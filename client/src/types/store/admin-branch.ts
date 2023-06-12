import {BranchInterface} from "../general/branch";
import {DeleteModalStateType} from "./admin";

export type AdminBranchStateType = {
    branchList: BranchInterface[];
    itemCount: number;
    pageSize: number;

    deleteModal: DeleteModalStateType;
    fetching: 'succeeded' | "pending";
    error: string;
}

export type AdminBranchFetchResultType = {
    branchList: BranchInterface[];
    itemCount: number;
    pageSize: number;
}