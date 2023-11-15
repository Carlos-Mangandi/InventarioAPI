import { Router } from 'express';
import dotenv from 'dotenv'
import routerProduct from './product.routes'
import routerSupplier from './supplier.routes'
// import routerSale from './sale.routes'
// import routerSaleDetails from './saleDetails.routes'
import routerUser from './user.routes'
import routerRole from './role.routes'
import { Supplier } from '../models/Supplier';

dotenv.config()

const URL = process.env.url  

const routes = Router()
 
routes.use(`${URL}/supplier`, routerSupplier)
routes.use(`${URL}/product`, routerProduct)
// routes.use(`${URL}/sale`, routerSale)
// routes.use(`${URL}/saleDetails`, routerSaleDetails)
routes.use(`${URL}/user`, routerUser)
routes.use(`${URL}/role`, routerRole)

export default routes