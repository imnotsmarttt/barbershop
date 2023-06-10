import {VisitInterface} from "../general/visit";
import {ServiceWithRankInterface} from "../general/services";
import {EmployeeWithRelationsInterface} from "../general/emoloyee";
import {BranchInterface} from "../general/branch";


export type  AdminStateType = {
    visits: AdminVisitsStateType;
    services: AdminServicesStateType;
    employee: AdminEmployeeStateType;
    branch: AdminBranchStateType;

    fetching: 'pending' | 'succeeded';
    error: string;
}


// visits
export type AdminVisitsStateType = {
    visitList: VisitInterface[];
    visitCount: number;
    pageSize: number;
}

// services
export type AdminServicesStateType = {
    serviceList: ServiceWithRankInterface[];
    itemCount: number;
    pageSize: number;
}

// employee
export type AdminEmployeeStateType = {
    employeeList: EmployeeWithRelationsInterface[]
    itemCount: number;
    pageSize: number;
}

// branch
export type AdminBranchStateType = {
    branchList: BranchInterface[];
    itemCount: number;
    pageSize: number;
}