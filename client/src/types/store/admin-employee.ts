import {EmployeeWithRelationsInterface} from "../general/emoloyee";
import {DeleteModalStateType} from "./admin";

export type AdminEmployeeStateType = {
    employeeList: EmployeeWithRelationsInterface[]
    itemCount: number;
    pageSize: number;

    deleteModal: DeleteModalStateType;
    fetching: 'succeeded' | "pending";
    error: string;
}

export type AdminEmployeeFetchResultType = {
    employeeList: EmployeeWithRelationsInterface[]
    itemCount: number;
    pageSize: number;
}

export interface AdminEmployeeCreateResultType extends EmployeeWithRelationsInterface {}

export type AdminEmployeeCreatePayloadType = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    hiredFrom: string;
    branchId: string;
    rankId: string;
    userId?: string;
    photo?: File;
}