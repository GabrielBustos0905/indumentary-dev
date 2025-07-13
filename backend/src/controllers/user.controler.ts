import { type Request, type Response } from 'express'
import prisma from '../lib/prisma'
import { UserRole } from '@prisma/client'
import { updateUserTypeSchema } from '../schemas/user.schema'

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
        createdAt: true,
        userType: true
      }
    })

    if (user == null) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    return res.status(200).json({ user })
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el perfil' })
  }
};

export const updateUserType = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params
  const result = updateUserTypeSchema.safeParse(req.body)

  
  if (!result.success) {
    return res.status(400).json({ error: result.error.format() })
  }
  
  const { userType } = result.data;
  console.log({"id": id, "userType": userType})

  if (!Object.values(UserRole).includes(userType)) {
    return res.status(400).json({ error: 'Rol de usuario inválido' })
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { userType }
    })

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error('Error al actualizar el rol del usuario:', error)
    return res.status(500).json({ error: 'Error al actualizar el usuario' })
  }
}
