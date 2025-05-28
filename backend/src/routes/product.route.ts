import { Router } from 'express'
import { createProduct, deleteProduct, getAllProduts, getProductById, updateProduct } from '../controllers/product.controller'
import { protect } from '../middlewares/auth.middleware'

const router = Router()

router.get('/', getAllProduts)
router.get('/:id', getProductById)
router.post('/', protect, createProduct)
router.put('/:id', protect, updateProduct)
router.delete('/:id', protect, deleteProduct)

export default router
