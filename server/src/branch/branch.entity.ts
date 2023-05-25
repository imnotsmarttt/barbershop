import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Employee} from "../employee/employee.entity";

@Entity()
export class Branch {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @Column({nullable: false})
    city: string

    @Column({nullable: false})
    address: string

    @Column({type: "time", nullable: false})
    openAt: Date

    @Column({type: "time", nullable: false})
    closeAt: Date

    // employees
    @OneToMany(() => Employee, (employee) => employee.branch)
    employees: Employee[]
}