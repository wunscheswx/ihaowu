import { Observable } from 'rxjs'
import { map, concatMap } from 'rxjs/operators'

import { Inject, Controller, HttpService } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import { hash } from '@ihaowu/nestjs-utils'

import { API_BASE_URL, OPEN_BASE_URL } from '../../constants/urls'

export type Client = {
  clientId: string;
  clientSecret: string
}

export type AccessToken = {
  openid: string
  scope: 'snsapi_base' | 'snsapi_userinfo'
  access_token: string
  refresh_token: string
  expires_in: number
}

export type AuthorizePayload = {
  redirectUri: string
  scope?: 'snsapi_base' | 'snsapi_userinfo'
  state?: string
}

export type OpenUser = {
  openid: string
  nickname: string
  sex: number
  province: string
  city: string
  country: string
  headimgurl: string
  privilege: string[]
  unionid: string
}

@Controller()
export class OAuthService {
  constructor(
    @Inject('MICRO_SERVICE') private readonly microService: ClientProxy,
    private readonly httpService: HttpService
  ) { }

  async generateOAuthUrl(payload: AuthorizePayload): Promise<string> {
    const msObservable = this.microService.send('config.get', 'wechat.clientId')
    const clientId = await msObservable.toPromise()
    const redirectUri = payload.redirectUri

    const url = new URL('connect/oauth2/authorize', OPEN_BASE_URL)
    const searchParams = url.searchParams

    searchParams.set('appid', clientId)
    searchParams.set('redirect_uri', redirectUri)
    searchParams.set('response_type', 'code')
    searchParams.set('scope', payload.scope || 'snsapi_userinfo')
    searchParams.set('state', payload.state || hash('sha256', redirectUri))

    url.hash = 'wechat_redirect'

    return url.toString()
  }

  getToken(code: string): Observable<AccessToken> {
    const source$ = this.microService.send<Client, string>('config.get', 'wechat')

    return source$.pipe(
      concatMap(
        (config) => this.httpService.request<AccessToken>({
          baseURL: API_BASE_URL,
          url: 'sns/oauth2/access_token',
          params: {
            appid: config.clientId,
            secret: config.clientSecret,
            code: code,
            grant_type: 'authorization_code'
          }
        })
      ),
      map(res => res.data)
    )
  }

  getUser(access_token: string, openid: string, lang: string = 'zh_CN'): Observable<OpenUser> {
    const source$ = this.httpService.request<OpenUser>({
      baseURL: API_BASE_URL,
      url: 'sns/userinfo',
      params: { access_token, openid, lang }
    })

    return source$.pipe(map(res => res.data))
  }
}
