import User, { Users } from '../Model/User'
import { Request, Response } from 'express'

export const handleLogout = async (req: Request, res: Response) => {
  const cookies = req.cookies

  if (!cookies?.jwt) return res.sendStatus(204)

  const refreshToken = cookies.jwt

  // Finding a user in the database with the refreshToken that is in the cookie
  const foundUser: Users | null = await User.findOne({
    refreshToken,
  }).exec()

  if (!foundUser) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      // Add secure: true when using https
      secure: true,
    })
    return res.sendStatus(204)
  }

  // Clear the refresh token from the database
  foundUser.refreshToken = ''
  const result = await foundUser.save()
  console.log(result)

  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'none',
    // Add secure: true when using https
    secure: true,
  })

  res.sendStatus(204)
}
