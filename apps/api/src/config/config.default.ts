import type { ClientOpts } from 'redis'

export default () => ({
  proxy: false,
  port: parseInt(process.env.PORT || '7100'),
  redis: <ClientOpts>{
    url: process.env.READS_URL,
  }
})
