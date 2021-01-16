import path from 'path'

import type { ClientOpts } from 'redis'

export default () => {
  const pkg = require('../../package.json')
  return {
    appInfo: {
      name: pkg.name,
      version: pkg.version,
      root: path.dirname(path.dirname(__dirname)),
    },
    redis: <ClientOpts>{
      url: process.env.READS_URL,
    },
  }
}
