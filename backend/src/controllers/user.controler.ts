import { type Request, type Response } from 'express'
import prisma from '../lib/prisma'

export const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await prisma.user.findMany()
    return res.json(users)
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener usuarios' })
  }
}

export const getProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    if ((req.user?.id) == null) {
      return res.status(401).json({ message: 'Usuario no autenticado' })
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    })

    if (user == null) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    return res.status(200).json({ user })
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el perfil' })
  }
}
