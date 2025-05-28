import jwt from 'jsonwebtoken'

export const generateToken = (userId: string): any => {
  if (process.env.JWT_SECRET == null) {
    throw new Error('JWT_SECRET is not defined in the .env file')
  }
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  })
}
