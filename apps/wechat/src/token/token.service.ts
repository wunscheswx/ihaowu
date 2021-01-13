import fetch from 'node-fetch'

import { Inject, Controller } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import { RedisService } from 'nestjs-redis'

import { API_BASE_URL } from '../constants/urls'

@Controller()
export class TokenService {
  constructor(
    private readonly redisService: RedisService,
    @Inject('MICRO_SERVICE') private readonly microService: ClientProxy
  ) { }

  async getToken(): Promise<string> {
    const client = this.redisService.getClient()
    const event = this.microService.send('config.get', 'wechat')

    const config = await event.toPromise()
    const clientId = config.clientId
    const storeKey = `wechat:token:${clientId}`

    const value = await client.get(storeKey)
    if (typeof value === 'string') return value

    const url = new URL('cgi-bin/token', API_BASE_URL)
    const searchParams = url.searchParams

    searchParams.set('appid', clientId)
    searchParams.set('secret', config.clientSecret)
    searchParams.set('grant_type', 'client_credential')

    const res = await fetch(url)
    const data = await res.json()

    const token = data.access_token
    if (token) {
      await client.setex(storeKey, 7100, token)
      return token
    }

    return data
  }
}
