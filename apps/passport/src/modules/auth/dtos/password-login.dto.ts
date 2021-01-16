import { IsString, Length } from 'class-validator'

export type PasswordLoginPayload = {
  username: string
  password: string
}

/* 密码登录 DTO 对象 */
export class PasswordLoginDto implements PasswordLoginPayload {
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
}
