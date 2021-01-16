export interface AuthInfo {
  uid: string
  isAdmin: boolean
}

export interface JwtAuthInfo extends AuthInfo {
  iat: number
  exp: number
}
