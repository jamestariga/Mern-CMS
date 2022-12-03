import * as JWT from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { Users } from '../Model/User'
import { Roles } from '../Configs/rolesList'

export interface RequestWithUser extends Request {
  user: Users
  roles: Roles[]
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  const secret = `${process.env.ACCESS_TOKEN_SECRET}`

  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)

  const token = authHeader.split(' ')[1]
  JWT.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      return res.sendStatus(403)
    }

    const verifyRequest = req as RequestWithUser

    verifyRequest.user = decoded.UserInfo.userName

    verifyRequest.roles = decoded.UserInfo.roles

    next()
  })
}

export default verifyJWT
