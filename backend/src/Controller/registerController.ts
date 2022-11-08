import User, { Users } from '../Model/User'
import * as bcrypt from 'bcrypt'
import { Request, Response } from 'express'

export const handleNewUser = async (req: Request, res: Response) => {
  const { userName, password, firstName, lastName } = req.body

  if (!userName || !password || !firstName || !lastName) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const duplicateUser: Users | null = await User.findOne({
    userName: userName,
  }).exec()

  if (duplicateUser) {
    return res.sendStatus(409).json({ message: 'User already exists' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await User.create({
      userName: userName,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    })

    console.log(result)
    res.json({ success: `New user ${userName} created` })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}
