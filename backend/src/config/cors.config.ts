import type cors from 'cors'

export const corsOptions: cors.CorsOptions = {
  origin: ['http://localhost:5173'], // origen del frontend
  credentials: true
}
