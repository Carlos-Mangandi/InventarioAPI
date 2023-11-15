
import { error } from 'console';
import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { User } from '../models/User'
import { Role } from '../models/Role';
import { Like, Not } from 'typeorm';

//Method by get
class UsersController {

    // save
    static createUser = async (req: Request, res: Response) => {
        const {name, lastName, email, password, rolId } = req.body
        const repoUsers = AppDataSource.getRepository(User)
        const repoRol = AppDataSource.getRepository(Role)
        let existingRol
        try {
            const userExist = await repoUsers.findOne({ where: { email } })
            if (userExist) {
                return res.json({ ok: false, 
                    msg:  `Email ${email} already exists ` })
            }

            if (rolId) {
                existingRol = await repoRol.findOne({ where: { id: rolId } })
                if (!existingRol) {
                    return res.json({
                        ok: false,
                        msg: `Role with ID '${rolId}' does not exist`,
                    })
                }
            } else{
                if(existingRol?.rol && rolId){
                    return res.json({
                        ok:false,
                        msg: 'Cannot assing supplier to a regular user'
                    })
                }
            }
            
            const user = new User()
            user.name = name
            user.lastName = lastName
            user.email = email
            user.password = password
            user.rol = existingRol

            await repoUsers.save(user)
            return res.json({
                ok: true,
                msg: 'User was create',
            });
        }catch (error) {
            return res.json({
                ok: false,
                msg: `Error => ${error}`,
            });
        }
    }

    static getUsers = async (req: Request, res: Response) => {
        const repoUsers = AppDataSource.getRepository(User);
        const name = req.query.name || ""
        // const role = req.query.role || ""
        
        console.log(req.query);
        try {
            const users = await repoUsers.find({
                where: { 
                    state: true,
                    name: Like(`%${name}%`),
                    // role: { name: Like(`%${role}%`) }
                },
                // relations: { role: true }
            });

            return users.length > 0
                ? res.json({
                    ok: true,
                    msg: 'list of users',
                    users
                }) : res.json({ ok: false, msg: 'data not found', users });
        }
        catch (error) {
            return res.json({
                ok: false,
                msg: `Error => ${error}`
            });
        }
    };

    // by-Id
    static byIdUser = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const repoUser = AppDataSource.getRepository(User);
        try {
            const user = await repoUser.findOne({
                where: { id, state: true },
            });
            // if (!user) {
            //     throw new Error('This user don exist in data base')
            // }
            return user
                ? res.json({ ok: true, user, msg: 'success' })
                : res.json({ ok: false, msg: "The id don't exist" });
        } catch (e) {
            return res.json({
                ok: false,
                msg: `Server error => ${e}`
            });
        }
    };
    // update 
    static updateUser = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        const repoUsers = AppDataSource.getRepository(User)
        const repoRol = AppDataSource.getRepository(Role)
        const { name, lastName, email, rolId } = req.body
        let user: User

        try {
            user = await repoUsers.findOneOrFail({
                where: { id, state: true },
            })

            if (!user) {
                throw new Error('User does not exist in the database')
            }

            const existingUser = await repoUsers.findOne({
                where: { email, id: Not(id) },
            })
            if (existingUser) {
                return res.json({
                    ok: false,
                    msg: `Email '${email}' already exists`
                })
            } 

            const existingRol = await repoRol.findOne({ where: { id: rolId } })
            if (!existingRol) {
                return res.json({
                    ok: false,
                    msg: `Role with ID '${rolId}' does not exist`
                })
            }

            user.name = name
            user.lastName = lastName
            user.email = email
            user.rol = existingRol

            await repoUsers.save(user)
            return res.json({
                ok: true,
                msg: 'User  updated',
                user: user,
            })
        } catch (error) {
            return res.json({
                ok: false,
                msg: `Error -> ${error}`
            })
        }
    }

    // delete
    static deleteUser = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const repoUser = AppDataSource.getRepository(User);
        try {
            const user = await repoUser.findOne({
                where: { id, state: true },
            });
            if (!user) {
                throw new Error("User don't exist in data base");
            }
            user.state = false;
            await repoUser.save(user);
            return res.json({
                ok: true,
                msg: "User was delete",
            });
        } catch (e) {
            return res.json({
                ok: false,
                msg: `Server error => ${e}`
            });
        }
    };
}

export default UsersController;