import User, { Users } from '../Model/User'
import * as JWT from 'jsonwebtoken'
import { Request, Response } from 'express'

const token = `${process.env.REFRESH_TOKEN_SECRET}`
const access = `${process.env.ACCESS_TOKEN_SECRET}`

export const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies: any = req.cookies

  if (!cookies.jwt) return res.sendStatus(401)

  const refreshToken: string = cookies.jwt

  const foundUser: Users | null = await User.findOne({
    refreshToken: refreshToken,
  }).exec()

  if (!foundUser) return res.sendStatus(403)

  JWT.verify(refreshToken, token, (err: any, decoded: any) => {
    if (err || foundUser.userName !== decoded.userName) {
      return res.sendStatus(403)
    }
    const roles = Object.values(foundUser.roles)
    const accessToken: string = JWT.sign(
      {
        UserInfo: {
          userName: decoded.userName,
          roles: roles,
        },
      },
      access,
      { expiresIn: '90s' }
    )
    res.json({ roles, accessToken })
  })
}
