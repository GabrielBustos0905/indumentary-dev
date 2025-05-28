import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import prisma from './prisma'
import dotenv from 'dotenv'
import { GOOGLE_CALLBACK_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../config/env.config'

dotenv.config()

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL
// eslint-disable-next-line @typescript-eslint/no-misused-promises
}, async (accessToken, refreshToken, profile, done): Promise<void> => {
  const email = profile.emails?.[0].value

  if (email == null) {
    done(new Error('No email provided')); return
  }

  let user = await prisma.user.findUnique({ where: { email } })

  if (user == null) {
    user = await prisma.user.create({
      data: {
        email,
        name: profile.displayName,
        password: null // porque se logueó con Google
      }
    })
  }

  done(null, user)
}))

passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser((id: string, done) => {
  prisma.user.findUnique({ where: { id } })
    .then(user => { done(null, user) })
    .catch(err => { done(err) })
})
