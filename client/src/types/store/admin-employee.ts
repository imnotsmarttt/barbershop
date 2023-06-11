import {EmployeeWithRelationsInterface} from "../general/emoloyee";

export type AdminEmployeeStateType = {
    employeeList: EmployeeWithRelationsInterface[]
    itemCount: number;
    pageSize: number;

    fetching: 'succeeded' | "pending";
    error: string;
}

export type AdminEmployeeFetchResultType = {
    employeeList: EmployeeWithRelationsInterface[]
    itemCount: number;
    pageSize: number;
}