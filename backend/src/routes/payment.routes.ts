import { Router } from 'express'
import { createPreference, paymentWebhook } from '../controllers/payment.controller'

const router = Router()

router.post('/preference', createPreference)
router.post('/webhook', paymentWebhook)

export default router
