import type cors from 'cors'

export const corsOptions: cors.CorsOptions = {
  origin: ['https://indumentary-dev.vercel.app'], // origen del frontend
  credentials: true
}
