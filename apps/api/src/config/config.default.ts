import type { ClientOpts } from 'redis'

export default () => ({
  proxy: false,
  redis: <ClientOpts>{
    url: process.env.READS_URL,
  }
})
