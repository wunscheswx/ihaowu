import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { map, concatMap } from 'rxjs/operators'

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
    const oAuthService = this.oAuthService
    const token = await oAuthService.getToken(payload.code).toPromise()

    const scope = token.scope
    if (scope === 'snsapi_base') {
      return { openid: token.openid, scope }
    }

    const wxUser = await oAuthService.getUser(token.access_token, token.openid).toPromise()
    return Object.assign(wxUser, { scope })
  }
}
