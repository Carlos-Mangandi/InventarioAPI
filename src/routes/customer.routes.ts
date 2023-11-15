import { Customer } from './../models/Customer';
import {} from 'express'
import {Router} from 'express'
import CustomerController from '../controllers/customer.controller'

const router = Router()
const customer = CustomerController

router.post("/", customer.createCustomer)
router.get('/', customer.getCustomers)
router.get('/:id', customer.byIdCustomer)
router.delete('/:id', customer.deleteCustomer)
router.put('/:id', customer.updateCustomer)

export default router