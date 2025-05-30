import { z } from 'zod'

export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      size: z.string(),
      quantity: z.number().min(1)
    })
  )
})

export const updateOrderStatusSchema = z.object({
  status: z.enum(['PENDING', 'PAID', 'SHIPPED', 'CANCELLED'])
})
