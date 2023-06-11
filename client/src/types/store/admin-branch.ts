import {BranchInterface} from "../general/branch";

export type AdminBranchStateType = {
    branchList: BranchInterface[];
    itemCount: number;
    pageSize: number;

    fetching: 'succeeded' | "pending";
    error: string;
}

export type AdminBranchFetchResultType = {
    branchList: BranchInterface[];
    itemCount: number;
    pageSize: number;
}