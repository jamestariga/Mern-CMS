import User, { Users } from '../Model/User'
import { Roles } from '../Configs/rolesList'
import * as bcrypt from 'bcrypt'
import * as JWT from 'jsonwebtoken'
import { Request, Response } from 'express'

const access = `${process.env.ACCESS_TOKEN_SECRET}`
const refresh = `${process.env.REFRESH_TOKEN_SECRET}`

interface UserInfo {
  userName: string
  password: string
}

export const handleLogin = async (req: Request, res: Response) => {
  const { userName, password }: UserInfo = req.body

  if (!userName || !password) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const foundUser: Users | null = await User.findOne({
    userName: userName,
  }).exec()

  if (!foundUser) return res.sendStatus(401)

  const passwordMatch = await bcrypt.compare(password, foundUser.password)

  if (passwordMatch) {
    const roles: Roles[] = Object.values(foundUser.roles).filter(Boolean)

    const accessToken: string = JWT.sign(
      {
        UserInfo: {
          userName: foundUser.userName,
          roles: roles,
        },
      },
      access,
      { expiresIn: '90s' }
    )

    const refreshToken: string = JWT.sign(
      {
        userName: foundUser.userName,
      },
      refresh,
      { expiresIn: '1d' }
    )

    foundUser.refreshToken = refreshToken
    const result = await foundUser.save()
    console.log(result)

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      // Add secure: true when using https
      // secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    })

    res.json({ userName, password, roles, accessToken })
  } else {
    res.sendStatus(401)
  }
}
