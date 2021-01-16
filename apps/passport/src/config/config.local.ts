import type { SwaggerDocumentOptions } from '@nestjs/swagger'
import type { SessionOptions } from 'express-session'

export default () => {
  const pkg = require('../../package.json')

  return {
    swagger: <SwaggerDocumentOptions>{
      title: pkg.name,
      version: pkg.version,
      description: '',
      path: 'api'
    },
    session: <SessionOptions>{
      resave: false,
      saveUninitialized: false,
      secret: 'RWk54BsNSIth2aXe'
    },
  }
}
