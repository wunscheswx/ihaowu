import { Inject, Controller, HttpService } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import { RedisService } from 'nestjs-redis'

import { API_BASE_URL } from '../../constants/urls'

@Controller()
export class TokenService {
  constructor(
    @Inject('MICRO_SERVICE') private readonly microService: ClientProxy,
    private readonly redisService: RedisService,
    private readonly httpService: HttpService
  ) { }

  async getToken(): Promise<string> {
    const client = this.redisService.getClient()
    const msObservable = this.microService.send('config.get', 'wechat')

    const config = await msObservable.toPromise()
    const clientId = config.clientId
    const storeKey = `wechat:token:${clientId}`

    const value = await client.get(storeKey)
    if (typeof value === 'string') return value

    const httpObservable = this.httpService.request({
      baseURL: API_BASE_URL,
      url: 'cgi-bin/token',
      params: {
        appid: clientId,
        secret: config.clientSecret,
        grant_type: 'client_credential'
      }
    })

    const res = await httpObservable.toPromise()
    const data = res.data

    const token = data.access_token
    if (token) {
      await client.setex(storeKey, 7100, token)
      return token
    }

    return data
  }
}
