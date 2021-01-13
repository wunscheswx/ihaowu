import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { OAuthService, AuthorizePayload } from './oauth.service'

@Controller()
export class OAuthController {
  constructor(private readonly oAuthService: OAuthService) { }

  @MessagePattern('wechat.oauth.authorize')
  async authorize(@Payload() payload: AuthorizePayload): Promise<string> {
    return this.oAuthService.generateOAuthUrl(payload)
  }

  @MessagePattern('wechat.oauth.userinfo')
  async getUser(@Payload() payload: { code: string }) {
    const token = await this.oAuthService.getToken(payload.code)
    const scope = token.scope
    const openid =  token.openid

    if (scope === 'snsapi_base') {
      return { openid, scope }
    }

    const res = await this.oAuthService.getUser(token.access_token, openid)
    if (res.openid) {
      return Object.assign(res, { scope })
    }

    return res
  }
}
