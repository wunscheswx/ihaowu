import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

import { TokenService } from './token.service'

@Controller()
export class TokenController {
  constructor(
    private readonly tokenService: TokenService) { }

  @MessagePattern('wechat.token')
  async token() {
    return this.tokenService.getToken()
  }
}
