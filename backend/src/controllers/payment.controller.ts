import { type Request, type Response } from 'express'
import mercadopago from '../lib/mercadopago'
import prisma from '../lib/prisma'

interface OrderItemData {
  productId: string
  size: string
  quantity: number
  unitPrice: number
}

interface Item {
  product_id: string
  size: string
  quantity: number
}

export const createPreference = async (req: Request, res: Response): Promise<any> => {
  const { items } = req.body
  const userId = req.user?.id

  if (userId == null) return res.status(401).json({ error: 'No autorizado' })

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const preference = await mercadopago.preferences.create({
      items: await Promise.all(items.map(async (item: any) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId }
        })

        if (product == null) throw new Error(`Producto ${item.productId} no encontrado`)

        return {
          id: item.productId,
          title: product.name,
          unit_price: (product.offer != null)
            ? +(product.price * (1 - product.offer / 100)).toFixed(2)
            : product.price,
          quantity: item.quantity,
          currency_id: 'ARS'
        }
      })),
      metadata: {
        userId,
        items
      },
      back_urls: {
        success: 'https://indumentary-dev.vercel.app/success',
        failure: 'https://indumentary-dev.vercel.app/failure',
        pending: 'https://indumentary-dev.vercel.app/pending'
      },
      auto_return: 'approved',
      notification_url: 'https://indumentary-dev.onrender.com/payments/webhook'
    } as any)

    return res.status(200).json({ init_point: preference.body.init_point })
  } catch (error) {
    console.error('Error al crear preferencia:', error)
    return res.status(500).json({ error: 'No se pudo crear la preferencia' })
  }
}

export const paymentWebhook = async (req: Request, res: Response): Promise<any> => {
  console.log('Webhook recibido')
  const type = req.body?.type ?? req.query?.type
  const paymentId = req.body?.data?.id ?? req.query?.['data.id']

  if (type !== 'payment') return res.status(200).send('Evento ignorado')
  if (paymentId == null) return res.status(400).send('Falta paymentId')

  try {
    const payment = await mercadopago.payment.findById(Number(paymentId))
    if (payment.body.status !== 'approved') return res.status(200).send('Pago no aprobado')
    console.log({ items: payment.body.metadata.items })
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { user_id } = payment.body.metadata
    const items = payment.body.metadata.items as Item[]
    const user = await prisma.user.findUnique({ where: { id: user_id } })
    if (user == null) return res.status(404).send('Usuario no encontrado')

    let total = 0
    const orderItemsData: OrderItemData[] = []

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.product_id } })
      if (product == null) throw new Error('Producto no encontrado')

      const unitPrice = product.offer != null
        ? product.price * (1 - product.offer / 100)
        : product.price

      if (!product.availableSizes.includes(item.size)) {
        throw new Error(`Talle ${item.size} no disponible para ${product.name}`)
      }

      if (product.stock < item.quantity) {
        throw new Error(`Stock insuficiente para ${product.name}`)
      }

      total += unitPrice * item.quantity

      orderItemsData.push({
        productId: product.id,
        size: item.size,
        quantity: item.quantity,
        unitPrice
      })
    }

    await prisma.$transaction(async (tx) => {
      await Promise.all(
        items.map(async item =>
          await tx.product.update({
            where: { id: item.product_id },
            data: {
              stock: { decrement: item.quantity }
            }
          })
        )
      )

      if (user_id == null || items == null) {
        console.error('Faltan datos en metadata:', payment.body.metadata)
        return res.status(400).send('Datos insuficientes para procesar el pago')
      }

      await tx.order.create({
        data: {
          userId: user_id,
          total,
          status: 'PAID',
          items: {
            create: orderItemsData
          }
        }
      })
    })

    return res.status(200).send('Orden creada correctamente')
  } catch (error) {
    console.error('Error en webhook:', error)
    return res.status(500).send('Error al procesar webhook')
  }
}
