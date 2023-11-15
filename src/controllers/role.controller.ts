import { error } from 'console';
import {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { Role } from "../models/Role";
import { Like } from "typeorm";

const roleRepository = AppDataSource
.getRepository("Role");

class RoleController {
    static createRole = async( req: Request, resp: Response) => {
        const { rol } = req.body
        try {
            const role = new Role()
            role.rol = rol

            await roleRepository.save(role)

            return resp.json({
                ok: true,
                ESTATUS_CODE: 200,
                message: 'Role was create',
            })
        } catch (error) {
            return resp.json({
                ok: false, 
                STATUS_CODE: 500, 
                message: `error = ${error.message}`
            })
        }
    };

    static getRoles = async (req:Request, resp:Response)=>{
        const rol = req.query.rol || ""
        console.log(req.query);
        try {
            const role = await roleRepository.find({ 
                where: {
                    state:true,
                    rol: Like(`%${rol}%`)
                },
            })
            return role.length>0 
                ?resp.json({
                    ok:true, 
                    role
                }) : resp.json({
                    ok:false, 
                    message:'Not found'
                })
        } catch (error) {
            return resp.json({
                ok: false, 
                message: `error = ${error.message}`
            })
        }
    }

    static byIdRole = async (req: Request, resp: Response) => {
        const id = parseInt(req.params.id)
        try {
            const role = await roleRepository.findOne({
                where: { id, state: true },
            });
            return role ? resp.json({ 
                ok: true, 
                role 
            })
            : resp.json({ 
                ok: false, 
                message: "The id don't exist" });
        } catch (error) {
            return resp.json({
                ok: false,
                message: `error = ${error.message}`
            });
        }
    }

    static deleteRole = async(req:Request, resp: Response) => {
        const id = parseInt(req.params.id)
        try {
            const role = await roleRepository.findOne({
                where: {id, state: true},
            })

            if(!role){
                throw new Error('Not found')
            }
            role.state = false;

            await roleRepository.save(role)

            return resp.json({
                ok: true,
                message: 'Rol was delete'   
            })
        } catch ( error) {
            return resp.json({
                ok: false,
                message:`error = ${error.message}`
            });
        }
    }

    static updateRole = async (req: Request, resp: Response) => {
        const id = parseInt(req.params.id);
        const { rol } = req.body
        try {
            const role = await roleRepository.findOne({
                where: { id, state: true },
            });
            if (!role) {
                throw new Error("Not found");
            }
            role.rol = rol;
            await roleRepository.save(role);
            return resp.json({
                ok: true,
                message: "Role was update",
            });
        } catch (error) {
            return resp.json({
                ok: false,
                STATUS_CODE:500,
                message: `error = ${error.message}`
            });
        }
    };
}

export default RoleController;

 