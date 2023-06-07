import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn} from "typeorm";
import {RoleEnum} from "../role/roles.enum";
import {Employee} from "../employee/employee.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    username: string

    @Column({nullable: false})
    password: string

    @Column({nullable: false})
    role: RoleEnum

    @OneToOne(() => Employee, (employee) => employee.user, {nullable: true, onDelete: 'SET NULL'})
    @JoinColumn()
    employee: Employee

    @CreateDateColumn({default: () => 'CURRENT_TIMESTAMP(6)'})
    createdAt: Date

    @Column({nullable: true, default: null})
    refreshToken: string
}
