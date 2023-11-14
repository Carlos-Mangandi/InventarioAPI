import { Producto } from './../models/Producto';
import { Proveedor } from '../models/Proveedor';
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { error } from "console";
import { type } from "os";
import { Like } from 'typeorm';

const proveedorRepository = AppDataSource 
    .getRepository("Proveedor"); 

class ProveedorController{
    static createProveedor = async(req:Request, resp:Response)=>{
        const { name, contact, direction, } = req.body
        try {
            const proveedor = new Proveedor()
            proveedor.name = name,
            proveedor.contact = contact,
            proveedor.direction = direction

            await proveedorRepository.save(proveedor) 

            return resp.json({ 
                ok: true, 
                STATUS_CODE: 200, 
                message: 'Proveedor was create with successfully'
            })
        } catch (error) {
            return resp.json({
                ok: false, 
                STATUS_CODE: 500, 
                message: `error = ${error.message}`
            })
        }
    }

    static getProveedores = async (req:Request, resp:Response)=>{
        const name = req.query.name || ""
        console.log(req.query);
        try {
            const proveedor = await proveedorRepository.find({ 
                where: {
                    state:true,
                    name: Like(`%${name}%`)
                },
            })
            return proveedor.length>0 
                ?resp.json({
                    ok:true, 
                    proveedor
                }) : resp.json({
                    ok:false, 
                    msg:'Not found'
                })
        } catch (error) {
            return resp.json({
                ok: false, 
                message: `error = ${error.message}`
            })
        }
    }

    static byIdProveedor = async (req:Request, resp:Response)=>{
        const id = parseInt(req.params.id) 
        try {
            const proveedor = await proveedorRepository.findOne({ 
                where: {
                    id,  
                    state: true 
                }
            })
            return proveedor ? resp.json({ 
                ok: true, proveedor
            }) 
            : resp.json({ 
                ok: false, 
                msg: "The id don´t exist" 
            });
        } catch (error) {
            return resp.json({ 
                ok: false, 
                message: `error = ${error.message}` 
            })
        }
    }
    
    static deleteProveedor = async(req:Request, resp:Response)=>{
        const id = parseInt(req.params.id)
        try{
            const proveedor = await proveedorRepository.findOne({where:{id, state: true}})

            if(!proveedor){
                throw new Error("Not found")
            }
            proveedor.state = false;

            await proveedorRepository.save(proveedor)

            return resp.json({ 
                ok: true, 
                msg: 'Proveedor was delete'
            })  
        }catch(error){
            return resp.json({ 
                ok:false, 
                message: `error = ${error.message}`
            }) 
        }
    }
    
    static updateProveedor = async(req:Request, resp:Response)=>{
        const id = parseInt(req.params.id)
        const {name, contact, direction} = req.body
        try{   
            const proveedor = await proveedorRepository.findOne({ 
                where: { id, state: true },})

            if(!name){
                throw new Error('Not Found')
            }

            proveedor.name = name,
            proveedor.contact = contact,
            proveedor.direction = direction
            await proveedorRepository.save(proveedor)
            return resp.json({ ok: true, STATUS_CODE:200, message: 'Proveedor was updated', proveedor})
        }
        catch (error){
            return resp.json ({
                ok:false, 
                STATUS_CODE:500,   
                message: `error = ${error.message}`
            })
        }
    }
}

export default ProveedorController

