import {EmployeeInterface} from "./emoloyee-types";
import {ServiceInterface} from "./services-type";

export interface VisitInterface {
    id: number;
    fullName: string;
    phoneNumber: string;
    email: string | null;
    startDate: string;
    endDate: string;
    status: string;
    employee: EmployeeInterface;
    service: ServiceInterface;
}