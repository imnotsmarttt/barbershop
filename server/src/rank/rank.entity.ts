import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Service} from "../services/services.entity";
import {Employee} from "../employee/employee.entity";

@Entity()
export class Rank {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false, unique: true})
    rank: string

    @Column({nullable: false})
    salaryPercent: number

    // employees
    @OneToMany(() => Employee, (employee) => employee.rank, {onDelete: 'RESTRICT'})
    employees: Employee[]

    // utils
    @OneToMany(() => Service, (service) => service.rank, {onDelete: 'CASCADE'})
    services: Service[]
}