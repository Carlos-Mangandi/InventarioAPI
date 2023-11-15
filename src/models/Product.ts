import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId} from "typeorm"
import { Supplier } from "./Supplier"

@Entity()
export class Product{
    @PrimaryGeneratedColumn("increment")
    id:number

    @ManyToOne(()=>Supplier)
    supplier: Supplier

    @RelationId((product: Product)=>product.supplier)
    supplierId:number

    @Column()
    name:string

    @Column()
    description: string

    @Column({type:'decimal', precision: 5, scale:2, default:0,})
    price: number

    @Column()
    stock: number

    @Column({default:true})
    state: boolean
}