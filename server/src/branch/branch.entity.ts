import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
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

    @CreateDateColumn({nullable: false})
    openAt: Date

    @CreateDateColumn({nullable: false})
    closeAt: Date

    @OneToMany(() => Employee, (employee) => employee.branch)
    employees: Employee[]
}