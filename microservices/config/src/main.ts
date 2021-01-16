import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Transport } from '@nestjs/microservices'

import { AppModule } from './app.module'

export async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: {
      url: process.env.READS_URL,
    },
  })
  const config = app.get(ConfigService)
  const appInfo = config.get('appInfo')

  app.listen(() => console.debug(`[bootstrap] ${appInfo.name}@${appInfo.version} is ready`))
}

if (require.main === module) {
  bootstrap()
}
