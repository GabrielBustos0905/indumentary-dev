import { z } from "zod"

export const updateUserTypeSchema = z.object({
  userType: z.enum(['ADMIN', 'CLIENT'])
})