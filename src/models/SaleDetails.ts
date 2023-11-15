import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId } from "typeorm";
import { Sale } from "./Sale";
import { Product } from "./Product";

@Entity()
export class SaleDetail{

    @PrimaryGeneratedColumn("increment")
    id: number

    @ManyToOne(()=> Sale)
    sale: Sale

    @RelationId((saleDetail: SaleDetail)=> saleDetail.sale)
    saleId: number

    @ManyToOne(()=> Product)
    product: Product

    @RelationId((saleDetail: SaleDetail)=> saleDetail.product)
    productId: number

    @Column()
    amount : number

    @Column()
    unitPrice: number

    @Column()
    subTotal: number

    @Column({default:true})
    state: boolean
}