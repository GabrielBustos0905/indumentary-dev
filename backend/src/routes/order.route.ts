import { Router } from 'express'
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrderStatus } from '../controllers/order.controller'

const router = Router()

router.get('/', getAllOrders)
router.post('/', createOrder)
router.get('/:id', getOrderById)
router.delete('/:id', deleteOrder)
router.put('/:id', updateOrderStatus)

export default router
