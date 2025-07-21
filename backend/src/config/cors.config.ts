import type cors from 'cors'

export const corsOptions: cors.CorsOptions = {
  origin: ['http://localhost:3000'], // origen del frontend
  credentials: true
}
