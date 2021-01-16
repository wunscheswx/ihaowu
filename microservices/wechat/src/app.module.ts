import { Module, HttpModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport, RedisOptions } from '@nestjs/microservices'

import { RedisModule } from 'nestjs-redis'

import { useConfigLoader } from '@ihaowu/nestjs-utils'

import { OAuthService } from './modules/oauth/oauth.service'
import { OAuthController } from './modules/oauth/oauth.controller'


import { TokenService } from './modules/token/token.service'
import { TokenController } from './modules/token/token.controller'

@Module({
  imports: [
    HttpModule.register({}),
    ConfigModule.forRoot({
      isGlobal: true,
      load: useConfigLoader(__dirname)
    }),
    ClientsModule.registerAsync([
      {
        name: 'MICRO_SERVICE',
        useFactory(configService: ConfigService): RedisOptions {
          return {
            transport: Transport.REDIS,
            options: configService.get('redis'),
          }
        },
        inject: [ConfigService]
      }
    ]),
    RedisModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return configService.get('redis')
      },
      inject: [ConfigService],
    })
  ],
  providers: [OAuthService, TokenService],
  controllers: [OAuthController, TokenController],
})
export class AppModule { }
