import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import {User} from "../users/users.entity";
import {Branch} from "../branch/branch.entity";
import {Visit} from "../visits/visit.entity";
import {Rank} from "../rank/rank.entity";

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

    @CreateDateColumn({nullable: true, default: null})
    firedFrom: Date

    // branch
    @ManyToOne(() => Branch, (branch) => branch.employees,)
    branch: Branch

    // rank
    @ManyToOne(() => Rank, (rank) => rank.employees)
    rank: Rank

    // user
    @OneToOne(() => User, (user) => user.employee)
    user: User

    @OneToMany(() => Visit, (visit) => visit.employee, {onDelete: "CASCADE"})
    visits: Visit[]
}

