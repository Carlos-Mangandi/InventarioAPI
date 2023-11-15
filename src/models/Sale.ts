
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId, CreateDateColumn } from "typeorm";
import { User } from './User'
import { Customer } from "./Customer";

@Entity()
export class Sale {

    @PrimaryGeneratedColumn("increment")
    id: number

    @ManyToOne(()=> Customer)
    customer: Customer

    @RelationId((sale: Sale)=> sale.customer)
    customerId: number

    @CreateDateColumn()
    createDate: Date

    @Column({type:'decimal', precision: 5, scale:2, default:0,})
    total: number

    @Column({default:true})
    state: boolean
}