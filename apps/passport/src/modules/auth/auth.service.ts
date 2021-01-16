import {
  Injectable,
  Scope
} from '@nestjs/common'

import { JwtService, JwtSignOptions } from '@nestjs/jwt'

import { SysUser } from '../prisma/prisma.service'

export type AuthInfo = {
  uid: string
  token: string
}

@Injectable({ scope: Scope.DEFAULT })
export class AuthService {

  constructor(private readonly jwtService: JwtService) {
  }

  async createToken(
    payload: string | Buffer | object,
    options?: JwtSignOptions
  ): Promise<string> {
    return this.jwtService.signAsync(payload, options)
  }
}
