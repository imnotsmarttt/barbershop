import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Relation
} from "typeorm";
import {User} from "../users/users.entity";
import {Service} from "../services/services.entity";
import {Branch} from "../branch/branch.entity";
import {Visit} from "../visits/visit.entity";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    firstName: string

    @Column({nullable: false})
    lastName: string

    @Column({nullable: true})
    photoUrl: string

    @Column({nullable: false})
    phoneNumber: string

    @Column({nullable: false})
    email: string

    @CreateDateColumn({nullable: false})
    hiredFrom: Date

    @CreateDateColumn({nullable: true})
    firedFrom: Date

    // branch
    @ManyToOne(() => Branch, (branch) => branch.employees, {nullable: false})
    branch: Branch

    // rank
    @ManyToOne(() => Rank, (rank) => rank.employees)
    rank: Relation<Rank>

    // user
    @OneToOne(() => User, (user) => user.employee, {nullable: true})
    user: User

    @OneToMany(() => Visit, (visit) => visit.employee)
    visits: Visit[]
}

@Entity()
export class Rank {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    rank: string

    // employees
    @OneToMany(() => Employee, (employee) => employee.rank)
    employees: Employee[]

    // services
    @OneToMany(() => Service, (service) => service.rank)
    services: Service[]
}