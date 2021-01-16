import type { SessionOptions } from 'express-session'

export default () => ({
  proxy: true,
  session: <SessionOptions>{
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }
})
