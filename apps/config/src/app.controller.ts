import { Controller } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MessagePattern, Payload } from '@nestjs/microservices'

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService){}

  @MessagePattern('config.get')
  get(@Payload() name: string): string {
    return this.configService.get(name)
  }
}
