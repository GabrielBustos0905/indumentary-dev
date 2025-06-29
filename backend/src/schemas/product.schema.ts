import { z } from 'zod'

const SizeEnum = z.enum(['XS', 'S', 'M', 'L', 'XL', '38', '39', '40', '41', '42', '43'])

export const createProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  price: z.number().positive('El precio debe ser mayor a 0'),

  stock: z.number().int().min(0, 'El stock no puede ser negativo').default(0),

  isFeatured: z.boolean().optional(),
  offer: z.number().optional(),

  typeId: z.string().uuid('ID de tipo inválido'),

  availableSizes: z.array(SizeEnum).nonempty('Debe haber al menos una talla válida'),

  images: z.array(z.object({
    url: z.string().url('URL de imagen inválida')
  })).nonempty('Debe subir al menos una imagen')
})

export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),

  stock: z.number().int().min(0).optional(),

  isFeatured: z.boolean().optional(),
  offer: z.number().optional(),

  typeId: z.string().uuid().optional(),

  availableSizes: z.array(SizeEnum).optional(),

  images: z.array(z.object({
    url: z.string().url()
  })).optional()
})

// TypeScript type
export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductDTO = z.infer<typeof updateProductSchema>

export const ALLOWED_SIZES = SizeEnum.options
