import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.config'

interface JwtPayload {
  userId: string
}

export const protect = (req: Request, res: Response, next: NextFunction): Response | any => {
  const token = req.cookies?.token

  if (token == null) {
    return res.status(401).json({ message: 'No token, acceso denegado' })
  }

  try {
    if (typeof JWT_SECRET !== 'string') {
      throw new Error('JWT_SECRET must be defined and a string')
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload

    req.user = { id: decoded.userId }

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' })
  }
}
