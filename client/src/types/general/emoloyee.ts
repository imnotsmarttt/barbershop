import {RankInterface} from "./rank";
import {BranchInterface} from "./branch";

export interface EmployeeInterface {
    id: number;
    firstName: string;
    lastName: string;
    photoUrl: string;
    phoneNumber: string;
    email: string;
    hiredFrom: string
    firedFrom: string | null
}

export interface EmployeeWithRelationsInterface extends EmployeeInterface {
    rank: RankInterface;
    branch: BranchInterface;
}