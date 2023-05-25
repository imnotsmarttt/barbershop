import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Rank} from "../rank/rank.entity";
import {Visit} from "../visits/visit.entity";

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    service: string

    @Column({nullable: false})
    price: number

    @Column({nullable: false})
    durationMin: number

    @Column({nullable: true})
    photoUrl: string

    // rank
    @ManyToOne(() => Rank, (rank) => rank.services)
    rank: Rank

    // visit
    @OneToMany(() => Visit, (visit) => visit.service)
    visits: Visit[]
}