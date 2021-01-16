import { IsString, IsOptional, IsUrl, Length, IsIn, IsNotIn } from 'class-validator'

import { Prisma } from '../../prisma/prisma.service'

export type SysUseCreateFields = 'avatar' | 'nickname' | 'gender' | 'username' | 'password'

export interface SysUserCreatePayload extends Pick<Prisma.SysUserCreateInput, SysUseCreateFields> { }

/* 创建用户的 DTO 对象 */
export class SysUserCreateDto implements SysUserCreatePayload {
  /* 注册用户名 */
  @IsString({
    message: '$property 必须是个字符串'
  })
  @Length(2, 16, {
    message: '$property 长度为 2～16 个字符'
  })
  username!: string

  /* 注册密码 */
  @IsString({
    message: '$property 必须是个字符串'
  })
  @Length(6, 18, {
    message: '$property 长度为 6～18 个字符'
  })
  password!: string

  /* 昵称 */
  @IsString({
    message: '$property 必须是个字符串'
  })
  @Length(2, 12, {
    message: '$property 长度为 2～12 个字符'
  })
  @IsNotIn(['昵称已重置', '管理员']) // 特殊昵称列表
  @IsOptional()
  nickname?: string

  /* 头像 */
  @IsUrl({}, {
    message: '$property 必须为合法的 URL'
  })
  @Length(10, 512, {
    message: '$property 长度为 10～512 个字符'
  })
  @IsOptional()
  avatar?: string

  /* 性别 */
  @IsIn([0, 1, 2], {
    message: '$property 必须是 [0-2] 的整数'
  })
  gender: number = 0
}
