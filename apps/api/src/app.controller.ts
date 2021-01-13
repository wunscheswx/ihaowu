import { Inject, Controller, Get, Res, Query } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { ClientProxy } from '@nestjs/microservices'

@Controller()
export class AppController {
  constructor(@Inject('MICRO_SERVICE') private readonly microService: ClientProxy) { }

  @Get()
  @ApiOperation({
    summary: '首页'
  })
  async index(): Promise<string> {
    const event = this.microService.send<string>('wechat.oauth.authorize', {
      redirectUri: 'https://www.baidu.com'
    })
    const url = await event.toPromise()

    return url
  }


  @Get('/authorize')
  @ApiOperation({
    summary: '微信授权登录'
  })
  async authorize(@Res() res: any) {
    const event = this.microService.send<string>('wechat.oauth.authorize', {
      redirectUri: 'https://www.baidu.com'
    })

    res.status(302).redirect(await event.toPromise())
  }

  @Get('/userinfo')
  @ApiOperation({
    summary: '微信授权登录'
  })
  async userinfo(@Query() query) {
    const event = this.microService.send<string>('wechat.oauth.userinfo', {
      code: query.code
    })
    const user = await event.toPromise()
    return user
  }

  @Get('/token')
  @ApiOperation({
    summary: '微信授权登录'
  })
  async token() {
    const event = this.microService.send<string>('wechat.token', false)
    return event.toPromise()
  }
}
