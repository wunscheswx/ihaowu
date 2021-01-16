import { isDefined } from 'class-validator'

import { Controller, Req, Post, Body, ConflictException, NotFoundException, NotAcceptableException } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { Request } from 'express'
import bcrypt from 'bcrypt'

import { ClassValidationPipe } from '../../pips/class-validator.pip'

import { Prisma, PrismaService } from '../prisma/prisma.service'

import { UserService } from '../user/user.service'
import { SysUserCreateDto } from '../user/dtos/user-create.dto'

import { AuthService } from './auth.service'

import { PasswordLoginDto } from './dtos/password-login.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  sysUserLogRepo: Prisma.SysUserLogDelegate

  constructor(
    prismaService: PrismaService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    this.sysUserLogRepo = prismaService.sysUserLog
  }

  @Post('login')
  @ApiOperation({
    summary: '登录',
    description: '使用用户名和密码进行登录'
  })
  async login(
    @Req() req: Request,
    @Body(ClassValidationPipe) dto: PasswordLoginDto
  ) {
    // 查找用户
    const existsUser = await this.userService.findExistsFirstUser([
      { username: dto.username }
    ])

    if (isDefined(existsUser)) {
      if (existsUser.isLocked) {
        throw new NotAcceptableException('账号被锁定，请联系客服处理!')
      }

      if (await bcrypt.compare(dto.password, existsUser.password)) {
        const clientIp = req.ip
        const sessionId = req.sessionID
        const uid = existsUser.uid

        const [access_token] = await Promise.all([
          this.authService.createToken({ uid, sessionId, clientIp }),
          this.sysUserLogRepo.create({
            data: {
              level: 'info',
              action: 'login',
              details: JSON.stringify({ sessionId }),
              message: '密码登录',
              userAgent: req.get('user-agent'),
              clientIp,
              SysUser: { connect: { uid } }
            }
          })
        ])

        // 存储登录用户
        // @ts-ignore
        req.session.user = { uid, access_token }

        return { code: 200, message: 'ok', access_token }
      }
    }

    throw new NotAcceptableException('用户名或密码错误')
  }

  @Post('register')
  @ApiOperation({
    summary: '注册',
    description: '使用用户名和密码进行注册'
  })
  async register(
    @Req() req: Request,
    @Body(ClassValidationPipe) dto: SysUserCreateDto
  ) {
    const username = dto.username
    const condition: Prisma.SysUserWhereInput[] = [{ username }]

    // 昵称是可选的
    if (isDefined(dto.nickname)) {
      condition.push({ nickname: dto.nickname })
    }

    // 查找用户
    const existsUser = await this.userService.findExistsFirstUser(condition)
    if (isDefined(existsUser)) {
      if (existsUser.username === username) {
        throw new ConflictException('用户名已存在')
      }
      throw new ConflictException('昵称已经存在')
    }

    const clientIp = req.ip
    const sessionId = req.sessionID

    // 创建用户
    const user = await this.userService.createUser(dto, {
      log: {
        level: 'info',
        action: 'register',
        details: JSON.stringify({ sessionId }),
        message: '用户注册',
        userAgent: req.get('user-agent'),
        clientIp
      }
    })

    // 生成 token
    const uid = user.uid
    const access_token = await this.authService.createToken({ uid, sessionId, clientIp })

    // 存储登录用户
    // @ts-ignore
    req.session.user = { uid, access_token }

    return { code: 200, message: 'ok', access_token }
  }
}
