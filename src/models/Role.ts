
import {Entity, PrimaryGeneratedColumn, Column  } from "typeorm";

@Entity()
export class Role{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    rol: string

    @Column({default: true})
    state: boolean
}