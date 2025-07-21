import express from 'express'
import session from 'express-session'
import passport from 'passport'
import cors from 'cors'
import dotenv from 'dotenv'
import { corsOptions } from './config/cors.config'
import cookieParser from 'cookie-parser'
import './lib/passport'
import { JWT_SECRET } from './config/env.config'

// ------- Rutas ------------
import userRoute from './routes/user.route'
import authRoute from './routes/auth.route'
import productTypeRoute from './routes/product-type.route'
import productRoute from './routes/product.route'
import orderRoute from './routes/order.route'
import favoriteRoute from './routes/favorite.route'
import paymentRoute from './routes/payment.routes'
// --------------------------

dotenv.config()
const app = express()

app.use(cookieParser())

// const isProduction = process.env.NODE_ENV === 'production';
app.use(session({
  secret: JWT_SECRET, // puede ser tu JWT_SECRET o uno propio
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    secure: true,
    // sameSite: isProduction ? 'none' : 'lax',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  } // opcional, caducidad de la cookie de sesión
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(cors(corsOptions))

app.get('/', (_, res) => {
  res.send('<h1>Api funcionando con estructura modular</h1>')
})

// --------- Rutas -----------
app.use('/users', userRoute)
app.use('/auth', authRoute)
app.use('/product-type', productTypeRoute)
app.use('/product', productRoute)
app.use('/order', orderRoute)
app.use('/favorite', favoriteRoute)
app.use('/payments', paymentRoute)
// ----------------------------

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
