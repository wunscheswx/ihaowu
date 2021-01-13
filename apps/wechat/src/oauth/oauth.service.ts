import fetch from 'node-fetch'

import { Inject, Controller } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import { hash } from '@ihaowu/nestjs-utils'

import { API_BASE_URL, OPEN_BASE_URL } from '../constants/urls'

export type AuthorizePayload = {
  redirectUri: string
  scope?: 'snsapi_base' | 'snsapi_userinfo'
  state?: string
}

export type AccessToken = {
  openid: string
  scope: 'snsapi_base' | 'snsapi_userinfo'
  access_token: string
  refresh_token: string
  expires_in: number
}

export type OpenUser = {
  openid: string
  nickname: string
  sex: number
  province: string
  city: string
  countrystring
  headimgurl: string
  privilege: string[]
  unionid: string
}

@Controller()
export class OAuthService {
  constructor(
    @Inject('MICRO_SERVICE') private readonly microService: ClientProxy
  ) { }

  async generateOAuthUrl(payload: AuthorizePayload): Promise<string> {
    const event = this.microService.send('config.get', 'wechat.clientId')
    const clientId = await event.toPromise()
    const redirectUri = payload.redirectUri

    const url = new URL('connect/oauth2/authorize', OPEN_BASE_URL)
    const searchParams = url.searchParams

    searchParams.set('appid', clientId)
    searchParams.set('redirect_uri', redirectUri)
    searchParams.set('response_type', 'code')
    searchParams.set('scope', payload.state || 'snsapi_userinfo')
    searchParams.set('state', payload.state || hash(redirectUri))

    url.hash = 'wechat_redirect'

    return url.toString()
  }

  async getToken(code: string): Promise<AccessToken> {
    const event = this.microService.send('config.get', 'wechat')
    const config = await event.toPromise()

    const url = new URL('sns/oauth2/access_token', API_BASE_URL)
    const searchParams = url.searchParams

    searchParams.set('appid', config.clientId)
    searchParams.set('secret', config.clientSecret)
    searchParams.set('code', code)
    searchParams.set('grant_type', 'authorization_code')

    const res = await fetch(url)
    const data = await res.json()

    return data
  }

  async getUser(token: string, openId: string, lang: string = 'zh_CN'): Promise<OpenUser> {
    const url = new URL('sns/userinfo', API_BASE_URL)
    const searchParams = url.searchParams

    searchParams.set('access_token', token)
    searchParams.set('openid', openId)
    searchParams.set('lang', lang)

    const res = await fetch(url)
    const data = await res.json()

    return data
  }
}
