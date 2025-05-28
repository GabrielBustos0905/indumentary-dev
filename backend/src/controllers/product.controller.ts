import { type Request, type Response } from 'express'
import prisma from '../lib/prisma'
import { createProductSchema, updateProductSchema } from '../schemas/product.schema'
import slugify from 'slugify'

export const getAllProduts = async (_req: Request, res: Response): Promise<any> => {
  try {
    const allProducts = await prisma.product.findMany({
      include: {
        images: true,
        type: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return res.status(200).json(allProducts)
  } catch (error) {
    console.error('Error al obtener productos:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const getProductById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        type: true
      }
    })

    if (product == null) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    res.json(product)
  } catch (error) {
    console.error('Error al obtener producto:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const createProduct = async (req: Request, res: Response): Promise<any> => {
  const result = createProductSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten() })
  }

  const {
    name,
    description,
    price,
    isFeatured,
    offer,
    typeId,
    availableSizes,
    images,
    stock
  } = result.data

  try {
    // Validamos que el tipo de producto exista
    const productTypeExists = await prisma.productType.findUnique({
      where: { id: typeId }
    })

    if (productTypeExists == null) {
      return res.status(400).json({ error: 'El tipo de producto no existe' })
    }

    // Generamos el slug
    const slug = slugify(name, { lower: true, strict: true })

    // Verificamos que el slug no esté duplicado
    const slugExists = await prisma.product.findUnique({ where: { slug } })

    if (slugExists != null) {
      return res.status(400).json({ error: 'Ya existe un producto con ese nombre (slug duplicado)' })
    }

    // Creamos el producto
    const newProduct = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        isFeatured,
        offer,
        typeId,
        availableSizes,
        stock,
        images: {
          create: images // crea las relaciones de imágenes
        }
      },
      include: {
        images: true,
        type: true
      }
    })

    return res.status(201).json(newProduct)
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const updateProduct = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params
  const result = updateProductSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() })
  }

  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    })

    if (existingProduct == null) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    const {
      name,
      description,
      price,
      isFeatured,
      offer,
      typeId,
      availableSizes,
      images,
      stock
    } = result.data

    const updateData: any = {
      description,
      price,
      isFeatured,
      offer,
      typeId,
      availableSizes,
      stock
    }

    // Si cambia el nombre, regeneramos el slug
    if ((name != null) && name !== existingProduct.name) {
      const newSlug = slugify(name, { lower: true, strict: true })

      const slugExists = await prisma.product.findFirst({
        where: {
          slug: newSlug,
          NOT: { id }
        }
      })

      if (slugExists != null) {
        return res.status(400).json({ error: 'Ya existe otro producto con ese nombre (slug duplicado)' })
      }

      updateData.name = name
      updateData.slug = newSlug
    }

    // Si vienen imágenes, se reemplazan
    if (images != null) {
      updateData.images = {
        deleteMany: {},
        create: images
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        images: true,
        type: true
      }
    })

    return res.status(200).json(updatedProduct)
  } catch (error) {
    console.error('Error al actualizar producto:', error)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params

  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: {
        OrderItem: true
      }
    })

    if (existingProduct == null) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    if (existingProduct.OrderItem.length > 0) {
      return res.status(400).json({
        error: 'No se puede eliminar un producto que ya fue comprado'
      })
    }

    // Eliminar imágenes relacionadas
    await prisma.productImage.deleteMany({
      where: { productId: id }
    })

    // Eliminar el producto
    await prisma.product.delete({
      where: { id }
    })

    return res.json({ message: 'Producto eliminado correctamente' })
  } catch (error: any) {
    console.error('Error al eliminar producto:', error)

    // Manejo específico del error P2025
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Producto no encontrado al intentar eliminar' })
    }

    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}
