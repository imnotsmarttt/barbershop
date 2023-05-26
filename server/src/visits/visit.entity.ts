import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Employee} from "../employee/employee.entity";
import {Service} from "../services/services.entity";
import {VisitStatusEnumDto} from "./visit.dto";

@Entity()
export class Visit {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    fullName: string

    @Column({nullable: false})
    phoneNumber: string

    @Column({nullable: true})
    email: string

    @CreateDateColumn({nullable: false})
    startDate: Date

    @CreateDateColumn({nullable: false})
    endDate: Date

    @Column({nullable: false, default: VisitStatusEnumDto.notStarted})
    status: VisitStatusEnumDto

    // employee
    @ManyToOne(() => Employee, (employee) => employee.visits, {nullable: false})
    employee: Employee

    // service
    @ManyToOne(() => Service, (service) => service.visits, {nullable: false})
    service: Service
}