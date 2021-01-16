import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'

import { RedisService } from 'nestjs-redis'

import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import session from 'express-session'
import createRedisStore from 'connect-redis'

import { AppModule } from './app.module'

const RedisStore = createRedisStore(session)

function showBanner(url: string) {
  const banner = `
App running at:
- HTTP:       ${url}
- Swagger UI: ${url}/api
`
  console.log(banner)
}

export async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const config = app.get(ConfigService)

  // 如果是 cookie 安全或启用反向代理，如：nginx
  if (config.get('session.Cookie.secure') || config.get('proxy')) {
    // 信任第一个代理
    app.set('trust proxy', 1)
  }

  app.use(helmet())
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))

  const redisService = app.get(RedisService)
  const store = new RedisStore({ client: redisService.getClient() })

  app.use(session({ ...config.get('session'), store }))

  const swaggerConfig = config.get('swagger')
  if (swaggerConfig) {
    const { DocumentBuilder, SwaggerModule } = require('@nestjs/swagger')
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setVersion(swaggerConfig.version)
      .setDescription(swaggerConfig.description)
      .addBearerAuth()
      .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup(swaggerConfig.path, app, document)
  }

  await app.listen(config.get<number>('PORT', 3000), config.get<string>('HOST', '0.0.0.0'))

  if (process.env.NODE_ENV === 'development') {
    showBanner(await app.getUrl())
  }
}

if (require.main === module) {
  bootstrap()
}
