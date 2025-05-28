import { type Request, type Response } from 'express'
import prisma from '../lib/prisma'
import { createProductTypeSchema, updateProductTypeSchema } from '../schemas/product-type.schema'

export const getProductType = async (_req: Request, res: Response): Promise<any> => {
  try {
    const productTypes = await prisma.productType.findMany()
    return res.status(200).json(productTypes)
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener tipos de Producto' })
  }
}

export const createProductType = async (req: Request, res: Response): Promise<any> => {
  const result = createProductTypeSchema.safeParse(req.body)

  if (!result.success) return res.status(400).json({ error: result.error.format() })

  const { name, imageUrl } = result.data
  try {
    const exists = await prisma.productType.findUnique({
      where: {
        name
      }
    })

    if (exists != null) return res.status(404).json({ error: 'Ya existe un tipo con ese nombre' })

    const newType = await prisma.productType.create({
      data: {
        name,
        imageUrl
      }
    })

    return res.status(201).json(newType)
  } catch (error) {
    console.error('Error al crear tipo de producto:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const updateProductType = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params

  const result = updateProductTypeSchema.safeParse(req.body)

  if (!result.success) return res.status(400).json({ error: result.error.format() })
  try {
    const existingType = await prisma.productType.findUnique({
      where: {
        id
      }
    })

    if (existingType == null) return res.status(400).json({ error: 'Tipo de producto no encontrado' })

    if ((result.data.name != null) && result.data.name !== existingType.name) {
      const nameExists = await prisma.productType.findUnique({
        where: { name: result.data.name }
      })

      if (nameExists != null) {
        return res.status(409).json({ error: 'Ya existe otro tipo con ese nombre' })
      }
    }
    const updated = await prisma.productType.update({
      where: { id },
      data: result.data
    })

    res.json(updated)
  } catch (error) {
    console.error('Error al actualizar tipo de producto:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const deleteProductType = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params
  try {
    const productType = await prisma.productType.findUnique({
      where: {
        id
      },
      include: {
        products: true
      }
    })

    if (productType == null) return res.status(404).json({ error: 'Tipo de producto no encontrado' })

    if (productType.products.length > 0) return res.status(404).json({ error: 'No se puede eliminar un tipo de producto con productos relacionados' })

    await prisma.productType.delete({
      where: {
        id
      }
    })

    return res.json({ message: 'Tipo de producto eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar tipo de producto:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
