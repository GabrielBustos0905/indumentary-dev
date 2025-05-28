import { z } from 'zod'

export const createProductTypeSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  imageUrl: z.string().min(1, 'La imagen es requerida').url('La URL de imagen no es válida')
})

export const updateProductTypeSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').optional(),
  imageUrl: z.string().min(1, 'La imagen es requerida').url('La URL de imagen no es válida').optional()
})

export type CreateProductTypeInput = z.infer<typeof createProductTypeSchema>
export type UpdateProductTypeInput = z.infer<typeof updateProductTypeSchema>
