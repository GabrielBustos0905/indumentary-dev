import { Router } from 'express'
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrderStatus } from '../controllers/order.controller'
import { protect } from '../middlewares/auth.middleware'

const router = Router()

router.get('/', protect(['ADMIN']), getAllOrders)
router.post('/', protect(['ADMIN']), createOrder)
router.get('/:id', protect(['ADMIN']), getOrderById)
router.delete('/:id', protect(['ADMIN']), deleteOrder)
router.put('/:id', protect(['ADMIN']), updateOrderStatus)

export default router
