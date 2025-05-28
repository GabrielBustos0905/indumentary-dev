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

  if (!result.success) return res.status(400).json({ error: result.error.flatten() })

  const { items, userId } = result.data

  try {
    // Validamos que el usuario exista
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (user == null) return res.status(404).json({ error: 'Usuario no encontrado' })

    // Validamos que todos los productos existan
    const productsId = items.map(item => item.productId)
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productsId
        }
      }
    })

    if (products.length !== productsId.length) return res.status(404).json({ error: 'Uno o mas productos no existen' })

    // Calculamos el total (usando el precio actual u oferta si hay)
    let total = 0
    const orderItemsData = items.map(item => {
      const product = products.find(p => p.id === item.productId)
      const unitPrice = product?.offer ?? product?.price ?? 0
      total += unitPrice * item.quantity

      return {
        productId: item.productId,
        size: item.size,
        quantity: item.quantity,
        unitPrice
      }
    })

    // Creamos la orden con loss items
    const order = await prisma.order.create({
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

    return res.status(200).json(order)
  } catch (error) {
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
