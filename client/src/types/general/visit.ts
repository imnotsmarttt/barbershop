import {EmployeeInterface} from "./emoloyee";
import {ServiceInterface} from "./services";

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