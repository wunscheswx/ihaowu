import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport, RedisOptions } from '@nestjs/microservices'

import { RedisModule } from 'nestjs-redis'

import { useConfigLoader } from '@ihaowu/nestjs-utils'

import { AppController } from './app.controller'
import { OAuthController } from './modules/wechat/oauth.controller'

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
        inject: [ConfigService],
      }
    ]),
    RedisModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return configService.get('redis')
      },
      inject: [ConfigService],
    }),
  ],
  providers: [],
  controllers: [AppController, OAuthController],
})
export class AppModule { }
