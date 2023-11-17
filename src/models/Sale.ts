
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId, CreateDateColumn } from "typeorm";
import { User } from './User'
import { Customer } from "./Customer";
import { Product } from "./Product";

@Entity()
export class Sale {

    @PrimaryGeneratedColumn("increment")
    id: number

    @CreateDateColumn()
    createDate: Date

    @ManyToOne(()=> Customer)
    customer: Customer

    @RelationId((sale: Sale)=> sale.customer)
    customerId: number

    @ManyToOne(()=> Product)
    product: Product

    @RelationId((sale:Sale)=> sale.product)
    productId: number

    @Column()
    amount : number

    @Column({type:'decimal', precision: 5, scale:2, default:0,})
    unitPrice: number
    
    @Column({type:'decimal', precision: 6, scale:2, default:0,})
    total: number

    @Column({default:true})
    state: boolean
}