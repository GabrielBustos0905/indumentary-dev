import { Router } from 'express'
import { getProductType, createProductType, updateProductType, deleteProductType } from '../controllers/product-type.controller'

const router = Router()

router.get('/', getProductType)
router.post('/', createProductType)
router.put('/:id', updateProductType)
router.delete('/:id', deleteProductType)

export default router
