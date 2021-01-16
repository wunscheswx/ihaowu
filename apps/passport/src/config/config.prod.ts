import type { SessionOptions } from 'express-session'
import ms from 'ms'

export default () => ({
  proxy: true,
  session: <SessionOptions>{
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: ms('7d')
    }
  }
})
