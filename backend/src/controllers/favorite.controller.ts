import { Request, Response } from 'express'
import prisma from '../lib/prisma'

export const addFavorite = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id
    const { productId } = req.body

    if (!productId) {
      return res.status(400).json({ error: 'productId es requerido' })
    }

    if(!userId) {
        return res.status(400).json({ error: 'Token es requerido' })
    }

    // Verificar si ya existe el favorito
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    })

    if (existingFavorite) {
      return res.status(400).json({ message: 'Producto ya está en favoritos' })
    }

    // Crear favorito
    const favorite = await prisma.favorite.create({
      data: {
        userId,
        productId
      }
    })

    res.status(201).json(favorite)
  } catch (error) {
    console.error('Error agregando favorito:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const getFavorites = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        product: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.status(200).json(favorites)
  } catch (error) {
    console.error('Error obteniendo favoritos:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const removeFavorite = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id
    const { productId } = req.params

    if(!userId) {
        return res.status(400).json({ error: 'Token es requerido' })
    }

    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    })

    if (!existingFavorite) {
      return res.status(404).json({ message: 'Favorito no encontrado' })
    }

    await prisma.favorite.delete({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    })

    res.status(200).json({ message: 'Favorito eliminado correctamente' })
  } catch (error) {
    console.error('Error eliminando favorito:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
