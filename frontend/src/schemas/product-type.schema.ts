import { z } from 'zod'

export const createProductTypeSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().min(1, "La descripcion es requerida"),
  imageUrl: z.string().min(1, 'La imagen es requerida').url('La URL de imagen no es válida')
})

export const updateProductTypeSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').optional(),
  description: z.string().min(1, "La descripcion es requerida"),
  imageUrl: z.string().min(1, 'La imagen es requerida').url('La URL de imagen no es válida').optional()
})