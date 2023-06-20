import {IBranch} from "branch/interfaces/branch.inteface";
import {IRank} from "rank/interfaces/rank.interface";
import {IServiceWithRank} from "services/interfaces/service.interface";

export interface IEmployee {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    hiredFrom: Date;
    firedFrom: Date | null;
    branch: IBranch;
    rank: IRank;
}

export interface IEmployeeFreeTime {
    start: string // date string
    availableServices: IServiceWithRank[]
}

export interface IFindAllEmployeeResult {
    employeeList: IEmployee[];
    itemCount: number;
    pageSize: number;
}