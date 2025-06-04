import { z } from "zod"

export const registerSchema = z.object({
  email: z.string().email({ message: 'Email invalido!' }),
  name: z.string().min(1, { message: 'El nombre es requerido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
})