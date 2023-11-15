import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../models/User";
import { error } from "console";
import { Like } from "typeorm";

const userRepository = AppDataSource 
    .getRepository("User"); 

class UserController{
    static createUser = async(req:Request, resp:Response)=>{
        const { name, lastName, email, password } = req.body 
        try {
            const user = new User()
            user.name = name,
            user.lastName =lastName,
            user.email = email,
            user.password = password

            await userRepository.save(user)  

            return resp.json({ 
                ok: true, 
                STATUS_CODE: 200, 
                message: 'User was create with successfully'})
        } 
        catch (error) {
            return resp.json({ 
                ok: false, 
                STATUS_CODE: 500,
                message: `error = ${error.message}`
            })         
        }
    }

    static getUsers =async (req:Request, resp:Response) => {
        const name = req.query.name || ""
        const role = req.query.role || ""

        console.log(req.query);
        try {
            const users = await userRepository.find({ 
                where: { 
                    state: true,
                    name: Like(`%${name}%`),
                    role: { name: Like(`%${role}%`) } 
                },
                relations: { role: true },
            })

            return users.length > 0
                ? resp.json({ 
                    ok: true, 
                    message: 'list of users', users 
                }) 
                : resp.json({ 
                    ok: false, 
                    message: 'Not found', 
                    users 
                });
        }catch (error) {
            return resp.json({ 
                ok: false, 
                message: `error => ${error.message}`})
        }
    }

    static byIdUser = async(req:Request, resp:Response)=>{
        const id = parseInt(req.params.id);
        try {
            const user = await userRepository.findOne({ 
                where: { id, state: true } })
            return user
                ? resp.json({ 
                ok: true, user
            }) 
            : resp.json({ 
                ok: false, 
                message: "The id don't exist" 
            });
        } catch (error) {
            return resp.json({ 
                ok: false, 
                message: `error = ${error.message}` 
            });
        }
    }

    static deleteUser = async(req:Request, resp:Response)=>{
        const id = parseInt(req.params.id);
        try {
            const user = await userRepository.findOne({ 
                where: { id, state: true }
            })
            if(!user){
                throw new Error("Not found")
            }
            user.state = false;
            await userRepository.save(user);
            return resp.json({ 
                ok: true, 
                message: "User was delete"
            })
        } 
        catch (error) {
            return resp.json({ 
                ok: false, 
                message: `error => ${error.message}` 
            })
        }
    }

    static updateUser = async(req:Request, resp:Response)=>{
        const id = parseInt(req.params.id)
        const {name, email} = req.body
        try{   
            const user = await userRepository.findOne({ 
                where: { id, state: true },
            })

            if(!name){
                throw new Error('Not Found')
            }

            user.name = name,
            user.email = email
            await userRepository.save(user)
            return resp.json({ 
                ok: true, 
                STATUS_CODE:200, 
                message: 'User was updated', 
                user
            })
        }catch (error){
            return resp.json ({
                ok:false, 
                STATUS_CODE:500,   
                message: `error = ${error.message}`
            })
        }
    }
}

export default UserController;