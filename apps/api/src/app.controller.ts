import { Request } from 'express'
import { PATH_METADATA } from '@nestjs/common/constants'

import { Controller, Get, Req } from '@nestjs/common'

import { OAuthController } from './modules/wechat/oauth.controller';

@Controller()
export class AppController {

  @Get()
  async index(@Req() req: Request): Promise<any> {
    const routePath = Reflect.getMetadata(PATH_METADATA, OAuthController)


    // url baseUrl originalUrl route
    // console.log(req.route)
    // console.log(req.url)
    // console.log(req.get('hostname'))
    // console.log(req.originalUrl)
    return routePath + Reflect.getMetadata(PATH_METADATA, OAuthController.prototype.callback)
  }
}
