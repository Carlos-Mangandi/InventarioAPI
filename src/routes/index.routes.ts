import { Router } from 'express';
import dotenv from 'dotenv'
import routerProducto from './producto.routes'
import routerProveedor from './proveedor.routes'
import { Proveedor } from '../models/Proveedor';

dotenv.config()

const URL = process.env.url  

const routes = Router()
 
routes.use(`${URL}/proveedor`, routerProveedor)
routes.use(`${URL}/producto`, routerProducto)

export default routes