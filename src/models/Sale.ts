
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId } from "typeorm";
import { User } from './User'

@Entity()
export class Sale {

    @PrimaryGeneratedColumn("increment")
    id: number

    @ManyToOne(()=> User)
    user: User

    @RelationId((sale: Sale)=> sale.user)
    userId: number

    @Column()
    dateSale: string

    @Column()
    total: number

    @Column({default:true})
    state: boolean
}