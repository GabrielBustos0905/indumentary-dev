import { Router, type RequestHandler } from 'express'
import { login, logout, register } from '../controllers/auth.controller'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.config'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

// ----- Google Provider -------
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }) as RequestHandler)
router.get('/google/callback',
  passport.authenticate('google', { session: false }) as RequestHandler,
  (req: any, res) => {
    const user = req.user
    const token = jwt.sign({ userId: user.id, userType: 'CLIENT' }, JWT_SECRET, { expiresIn: '7d' })

    // Mandar cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // res.redirect(process.env.FRONTEND_URL || '/') o a donde quieras en el fronten
    res.redirect('https://indumentary-dev.vercel.app');
  }
)
// -----------------------------

export default router
