import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Customer{
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    name: string

    @Column()
    lastName: string

    @Column()
    direction: string

    @Column({default:true})
    state: boolean
}