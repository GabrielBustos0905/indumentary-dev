import { type Request, type Response } from 'express'
import prisma from '../lib/prisma'
import { createOrderSchema, updateOrderStatusSchema } from '../schemas/order.schema'

export const getAllOrders = async (_req: Request, res: Response): Promise<any> => {
  try {
    const allOrders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        },
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return res.status(200).json(allOrders)
  } catch (error) {
    console.error('Error al obtener órdenes:', error)
    return res.status(500).json({ error: 'Error al obtener las órdenes' })
  }
}

export const createOrder = async (req: Request, res: Response): Promise<any> => {
  const result = createOrderSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() })
  }

  const { items } = result.data
  const userId = req.user?.id

  if (userId == null) {
    return res.status(401).json({ error: 'No autorizado' })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (user == null) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    const productsId = items.map(item => item.productId)
    const products = await prisma.product.findMany({
      where: {
        id: { in: productsId }
      }
    })

    if (products.length !== productsId.length) {
      return res.status(404).json({ error: 'Uno o más productos no existen' })
    }

    let total = 0

    const orderItemsData = items.map(item => {
      const product = products.find(p => p.id === item.productId)

      if (product == null) throw new Error('Producto no encontrado internamente')

      if (!product.availableSizes.includes(item.size)) {
        throw new Error(`Talle ${item.size} no disponible para el producto ${product.name}`)
      }

      if (product.stock < item.quantity) {
        throw new Error(`No hay suficiente stock para el producto ${product.name}`)
      }

      const unitPrice = product.offer ?? product.price
      total += unitPrice * item.quantity

      return {
        productId: item.productId,
        size: item.size,
        quantity: item.quantity,
        unitPrice
      }
    })

    const order = await prisma.$transaction(async (tx) => {
      // Actualizar stock
      await Promise.all(
        items.map(async item => {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                decrement: item.quantity
              }
            }
          })
        })
      )

      // Crear orden con items
      return await tx.order.create({
        data: {
          userId,
          total,
          items: {
            create: orderItemsData
          }
        },
        include: {
          items: true
        }
      })
    })

    return res.status(200).json(order)
  } catch (error: any) {
    console.error('Error al crear orden:', error)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const getOrderById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params

  try {
    const existingOrder = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true
          }
        },
        user: true
      }
    })

    if (existingOrder == null) return res.status(404).json({ error: 'Orden no encontrada' })

    return res.status(200).json(existingOrder)
  } catch (error) {
    console.error('Error al obtener orden:', error)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const deleteOrder = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params

  try {
    const existingOrder = await prisma.order.findUnique({
      where: { id }
    })

    if (existingOrder == null) return res.status(404).json({ error: 'Orden no encontrada' })

    await prisma.orderItem.deleteMany({
      where: {
        orderId: id
      }
    })

    await prisma.order.delete({
      where: { id }
    })

    return res.status(200).json({ message: 'Orden eliminada correctamente' })
  } catch (error) {
    console.error('Error al eliminar orden:', error)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const updateOrderStatus = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params
  const result = updateOrderStatusSchema.safeParse(req.body)

  if (!result.success) return res.status(404).json({ error: result.error.flatten() })

  try {
    const { status } = result.data
    const existingOrder = await prisma.order.findUnique({
      where: { id }
    })

    if (existingOrder == null) return res.status(404).json({ error: 'Orden no encontrada' })

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status }
    })

    return res.status(200).json(updatedOrder)
  } catch (error) {
    console.error('Error al actualizar estado:', error)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}
