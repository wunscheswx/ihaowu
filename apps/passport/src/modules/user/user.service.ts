import {
  Injectable,
  Scope
} from '@nestjs/common'

import { isDefined } from 'class-validator'

import bcrypt from 'bcrypt'

import { Prisma, PrismaService, SysUser } from '../prisma/prisma.service'

import { SysUserCreatePayload } from './dtos/user-create.dto'

export type SysUserLogCreateInput = Prisma.SysUserLogCreateWithoutSysUserInput

export type CreateUserExtraInfo = {
  log?: SysUserLogCreateInput
}

@Injectable({ scope: Scope.DEFAULT })
export class UserService {
  private readonly saltRounds: number = 10

  private readonly sysUserRepo: Prisma.SysUserDelegate

  constructor(prismaService: PrismaService) {
    this.sysUserRepo = prismaService.sysUser
  }

  /**
   * 使用多个条件查找，查找已存在的用户
   *
   * @param condition 查询条件
   */
  findExistsFirstUser(condition: Prisma.SysUserWhereInput[]): Promise<SysUser> {
    return this.sysUserRepo.findFirst({
      where: {
        OR: condition,
        isDeleted: false, // 非删除用户
      }
    })
  }

  /**
   * 使用多个条件查找，查找用户
   *
   * @param condition 查询条件
   */
  findFirstUser(condition: Prisma.SysUserWhereInput[]): Promise<SysUser> {
    return this.sysUserRepo.findFirst({
      where: {
        OR: condition,
        isDeleted: false, // 非删除用户
        // isLocked: false, // 非锁定用户
        isAdmin: false // 管理员用户
      }
    })
  }

  /**
   * 创建用户
   *
   * @param data 用户数据
   */
  async createUser(data: SysUserCreatePayload, extra?: CreateUserExtraInfo): Promise<SysUser> {
    if (isDefined(data.password)) {
      const salt = await bcrypt.genSalt(this.saltRounds)
      data.password = await bcrypt.hash(data.password, salt)
    }

    // 添加日志
    if (isDefined(extra) && isDefined(extra.log)) {
      (data as Prisma.SysUserCreateInput).SysUserLogs = {
        create: extra.log
      }
    }

    return this.sysUserRepo.create({ data: data })
  }
}
