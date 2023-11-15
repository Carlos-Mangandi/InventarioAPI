import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId} from "typeorm"
import { Supplier } from "./Supplier"

@Entity()
export class Product{
    @PrimaryGeneratedColumn("increment")
    id:number

    @RelationId((product: Product)=>product.supplier)
    supplierId:number

    @Column()
    name:string

    @Column()
    description: string

    @Column()
    price: string

    @Column()
    stock: number

    @Column({default:true})
    state: boolean

    @ManyToOne(()=>Supplier)
    supplier: Supplier
}