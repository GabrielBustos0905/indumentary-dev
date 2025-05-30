import { Router } from 'express'
import { getProductType, createProductType, updateProductType, deleteProductType } from '../controllers/product-type.controller'
import { protect } from '../middlewares/auth.middleware'

const router = Router()

router.get('/', getProductType)
router.post('/', protect(['ADMIN']), createProductType)
router.put('/:id', updateProductType)
router.delete('/:id', protect(['ADMIN']), deleteProductType)

export default router
