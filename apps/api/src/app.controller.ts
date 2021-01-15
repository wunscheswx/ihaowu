import { Request } from 'express'

import { Controller, Get, Req } from '@nestjs/common'

import { pathFor, urlFor } from '@ihaowu/nestjs-utils'

import { OAuthController } from './modules/wechat/oauth.controller';

@Controller()
export class AppController {
  @Get()
  async index(@Req() req: Request): Promise<any> {
    return urlFor(req, pathFor(OAuthController, 'callback')).toString()
  }
}
