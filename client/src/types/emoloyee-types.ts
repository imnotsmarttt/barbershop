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