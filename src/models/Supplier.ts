import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Supplier{
    @PrimaryGeneratedColumn("increment")
    id:number
    
    @Column()
    name: string

    @Column()
    contact: number

    @Column()
    direction: string

    @Column({default:true})
    state: boolean
}