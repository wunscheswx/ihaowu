import type { ClientOpts } from 'redis'

export default () => ({
  proxy: false,
  port: 7000,
  redis: <ClientOpts>{
    url: process.env.READS_URL,
  }
})
