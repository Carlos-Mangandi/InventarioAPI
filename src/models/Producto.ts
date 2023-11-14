import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId} from "typeorm"
import { Proveedor } from "./Proveedor"

@Entity()
export class Producto{
    @PrimaryGeneratedColumn("increment")
    id:number

    @RelationId((producto: Producto)=>producto.proveedor)
    proveedorId:number

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

    @ManyToOne(()=>Proveedor)
    proveedor: Proveedor
}