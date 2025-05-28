import dotenv from 'dotenv'

dotenv.config()

function getEnvVar (key: string): string {
  const value = process.env[key]
  if (value == null) {
    throw new Error(`Missing env variable: ${key}`)
  }
  return value
}

export const GOOGLE_CLIENT_ID = getEnvVar('GOOGLE_CLIENT_ID')
export const GOOGLE_CLIENT_SECRET = getEnvVar('GOOGLE_CLIENT_SECRET')
export const GOOGLE_CALLBACK_URL = getEnvVar('GOOGLE_CALLBACK_URL')
export const JWT_SECRET = getEnvVar('JWT_SECRET')
