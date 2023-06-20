export interface IBranch {
    id: number
    name: string
    city: string
    address: string
    openAt: string
    closeAt: string
}

export interface IFindAllBranchResult {
    branchList: IBranch[];
    itemCount: number;
    pageSize: number;
}