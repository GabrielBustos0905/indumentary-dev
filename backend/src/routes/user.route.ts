import { Router } from 'express'
import { getProfile, getUsers } from '../controllers/user.controler'
import { protect } from '../middlewares/auth.middleware'

const router = Router()

router.get('/', protect(['ADMIN']), getUsers)
router.get('/me', protect(), getProfile)
// router.get('/:id')

export default router
