import {BranchInterface} from "branch/interfaces/branch.inteface";
import {RankInterface} from "rank/interfaces/rank.interface";
import {ServiceWithRankInterface} from "services/interfaces/service.interface";

export interface EmployeeInterface {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    hiredFrom: Date;
    firedFrom: Date | null;
    branch: BranchInterface;
    rank: RankInterface;
}

export interface EmployeeFreeTimeInterface {
    start: string // date string
    availableServices: ServiceWithRankInterface[]
}

export interface FindAllEmployeeResult {
    employeeList: EmployeeInterface[];
    itemCount: number;
    pageSize: number;
}