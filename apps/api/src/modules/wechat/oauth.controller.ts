import { Request, Response } from 'express'

import { Inject, Controller, Get, Req, Res, Query } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { ClientProxy } from '@nestjs/microservices'

import { hash, pathFor, urlFor } from '@ihaowu/nestjs-utils'

@Controller('/wechat/oauth')
export class OAuthController {
  constructor(@Inject('MICRO_SERVICE') private readonly microService: ClientProxy) { }

  @Get('/authorize')
  @ApiOperation({
    summary: '微信授权登录'
  })
  async authorize(@Req() req: Request, @Res() res: Response): Promise<void> {
    const url = urlFor(req, pathFor(OAuthController, 'callback'))

    // 添加域名回调地址
    url.searchParams.set('callbackURL', req.query.callbackURL as string)

    // 获取微信授权地址
    const source$ = this.microService.send<string>('wechat.oauth.authorize', {
      redirectUri: url.toString(),
      state: hash('md5', req.sessionID)
    })

    res.status(302).redirect(await source$.toPromise())
  }
q
  @Get('/callback')
  @ApiOperation({
    summary: '微信授权回调地址'
  })
  async callback(@Query() query) {
    const source$ = this.microService
      .send<string>('wechat.oauth.userinfo', { code: query.code })
    const wxUser = await source$.toPromise()

    return wxUser
  }
}
