import type { ClientOpts } from 'redis'
import type { SessionOptions } from 'express-session'

export default () => ({
  proxy: false,
  redis: <ClientOpts>{
    url: process.env.READS_URL,
  },
  session: <SessionOptions>{
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }
})
