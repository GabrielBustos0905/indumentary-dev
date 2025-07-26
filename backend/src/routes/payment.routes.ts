import { Router } from 'express'
import { createPreference, paymentWebhook } from '../controllers/payment.controller'
import { protect } from '../middlewares/auth.middleware'

const router = Router()

router.post('/preference', protect(), createPreference)
router.post('/webhook', paymentWebhook)

export default router
