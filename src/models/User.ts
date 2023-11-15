import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId } from "typeorm";
import { Rol } from "./Role";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Rol)
    rol: Rol

    @RelationId((user: User) => user.rol)
    rolId: number

    @Column()
    name: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({ default: true })
    state: boolean
}
