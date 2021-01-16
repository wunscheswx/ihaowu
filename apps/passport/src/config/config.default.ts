import type { ClientOpts } from 'redis'

import type { JwtModuleOptions } from '@nestjs/jwt'

export default () => ({
  port: 7000,
  proxy: false,
  jwt: <JwtModuleOptions>{
    secret: process.env.JWT_SECRET,
    expiresIn: '30m'
  },
  redis: <ClientOpts>{
    url: process.env.READS_URL,
  }
})
