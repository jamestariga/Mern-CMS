import { Request, Response, NextFunction } from 'express'
import { Roles } from '../Configs/rolesList'

interface RequestWithUser extends Request {
  roles: Roles[]
}

const verifyRoles = (...allowedRoles: Number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const roles: Array<Roles> = (req as RequestWithUser).roles

    if (!roles) return res.sendStatus(401)

    const rolesArray = [...allowedRoles]
    console.log(rolesArray)
    console.log(roles)

    const result = roles
      .map((role: any) => rolesArray.includes(role))
      .find((val: Boolean) => val === true)

    if (!result) return res.sendStatus(401)

    next()
  }
}

export default verifyRoles
