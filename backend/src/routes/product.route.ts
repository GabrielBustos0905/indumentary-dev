import { Router } from 'express'
import { createProduct, deleteProduct, getAllProduts, getProductById, updateProduct } from '../controllers/product.controller'
import { protect } from '../middlewares/auth.middleware'

const router = Router()

router.get('/', getAllProduts)
router.get('/:id', getProductById)
router.post('/', protect(['ADMIN']), createProduct)
router.put('/:id', protect(['ADMIN']), updateProduct)
router.delete('/:id', protect(['ADMIN']), deleteProduct)

export default router
