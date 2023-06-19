export interface BranchInterface {
    id: number
    name: string
    city: string
    address: string
    openAt: string
    closeAt: string
}

export interface FindAllBranchResultInterface {
    branchList: BranchInterface[];
    itemCount: number;
    pageSize: number;
}