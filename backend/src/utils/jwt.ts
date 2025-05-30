import jwt from 'jsonwebtoken'
import { type UserRole } from '@prisma/client'

export const generateToken = (userId: string, userType: UserRole): any => {
  if (process.env.JWT_SECRET == null) {
    throw new Error('JWT_SECRET is not defined in the .env file')
  }
  // console.log('En generateToken:', userId, userType)

  return jwt.sign({ userId, userType }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  })
}
