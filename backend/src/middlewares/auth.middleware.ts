import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.config'

interface JwtPayload {
  userId: string
  userType: 'ADMIN' | 'CLIENT'
}

export const protect = (allowedRoles: Array<'ADMIN' | 'CLIENT'> = []) => {
  return (req: Request, res: Response, next: NextFunction): Response | any => {
    const token = req.cookies?.token

    if (token == null) {
      return res.status(401).json({ message: 'No token, acceso denegado' })
    }

    try {
      if (typeof JWT_SECRET !== 'string') {
        throw new Error('JWT_SECRET must be defined and a string')
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const decoded = jwt.verify(token, JWT_SECRET)

      // Verificamos que sea del tipo correcto
      if (
        typeof decoded !== 'object' ||
        decoded === null ||
        !('userId' in decoded) ||
        !('userType' in decoded)
      ) {
        return res.status(401).json({ message: 'Token inválido' })
      }

      const { userId, userType } = decoded as JwtPayload

      req.user = { id: userId, userType }

      // Validamos rol
      if (allowedRoles.length > 0 && !allowedRoles.includes(userType)) {
        return res.status(403).json({ message: 'No autorizado' })
      }

      next()
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido o expirado' })
    }
  }
}
