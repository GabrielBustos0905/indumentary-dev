import { type Request, type Response } from 'express'
import prisma from '../lib/prisma'
import { loginSchema, registerSchema } from '../schemas/user.schema'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jwt'

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = registerSchema.safeParse(req.body)

    if (!result.success) return res.status(400).json({ error: result.error.format() })

    const { email, password, name } = result.data

    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser?.email === email) return res.status(400).json({ message: 'Email existente!' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    })

    return res.status(201).json({ message: 'Usuario creado', user: { id: user.id, email: user.email, name: user.name } })
  } catch (error) {
    return res.status(500).json({ message: 'Error en el registro' })
  }
}

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = loginSchema.safeParse(req.body)

    if (!result.success) return res.status(400).json({ error: result.error.format() })

    const { email, password } = result.data

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
        userType: true,
        email: true,
        name: true
      }
    })

    if (user?.password == null) return res.status(400).json({ message: 'Credenciales inválidas' })

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) return res.status(400).json({ message: 'Contraseña incorrecta' })

    const token = generateToken(user.id, user.userType)

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: 'https://indumentary-dev.vercel.app',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
    });

    res.cookie('token_middleware', token, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      path: 'https://indumentary-dev.vercel.app',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    console.log("cookie", req.cookies.token)

    return res.status(200).json({
      message: 'Login exitoso',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })
  } catch (error) {
    return res.status(500).json({ message: 'Error en el login' })
  }
}

export const logout = async (req: Request, res: Response): Promise<any> => {
  // Destruir la sesión de passport
  req.logout((err) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (err) {
      return res.status(500).json({ message: 'Error al cerrar sesión' })
    }
  })

  // Limpiar cookie del token
  // res.clearCookie('token', {
  //   // httpOnly: true,
  //   secure: true,
  //   sameSite:'none',
  //   maxAge: 0 // Asegura que la cookie se borre
  // })

  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  res.clearCookie('token_middleware', {
    httpOnly: false,
    secure: true,
    sameSite: 'none',
  });

  return res.status(200).json({ message: 'Sesión cerrada exitosamente' })
}
