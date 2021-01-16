import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport, RedisOptions } from '@nestjs/microservices'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'

import { RedisModule } from 'nestjs-redis'

import { useConfigLoader } from '@ihaowu/nestjs-utils'

import { PrismaService } from './modules/prisma/prisma.service'

import { AuthService } from './modules/auth/auth.service'
import { AuthController } from './modules/auth/auth.controller'

import { UserService } from './modules/user/user.service'

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
    JwtModule.registerAsync({
      useFactory(configService: ConfigService): JwtModuleOptions {
        return configService.get('jwt')
      },
      inject: [ConfigService]
    })
  ],
  providers: [PrismaService, AuthService, UserService],
  controllers: [AuthController],
})
export class AppModule { }
