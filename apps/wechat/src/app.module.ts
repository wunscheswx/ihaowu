import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport, RedisOptions } from '@nestjs/microservices'

import { RedisModule } from 'nestjs-redis'

import { useConfigLoader } from '@ihaowu/nestjs-utils'

import { OAuthService } from './oauth/oauth.service'
import { OAuthController } from './oauth/oauth.controller'


import { TokenService } from './token/token.service'
import { TokenController } from './token/token.controller'

@Module({
  imports: [
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
