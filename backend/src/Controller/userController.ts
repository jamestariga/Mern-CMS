import User, { Users } from '../Model/User'
import * as bcrypt from 'bcrypt'

interface Response {
  status: (code: number) => Response
  send: (data: any) => Response
  json: (data: any) => Response
}

interface Request {
  body: {
    firstName: string
    lastName: string
    userName: string
    password: string
    admin?: boolean
    editor?: boolean
    _id: string
  }
  params: {
    id: string
  }
}

enum RoleNumbers {
  Admin = 5150,
  Editor = 1984,
}

export const createUser = async (req: Request, res: Response) => {
  const { userName, password, firstName, lastName, admin, editor } = req.body
  if (!userName || !password || !firstName || !lastName) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  // check if user already exists
  const user: Users | null = await User.findOne({ userName: userName })

  if (user) {
    return res.status(400).json({ message: 'User already exists' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const result: Users = await User.create({
      userName: userName,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      roles: {
        User: 2001,
        Editor: editor ? 1984 : 0,
        Admin: admin ? 5150 : 0,
      },
    })
    res.status(201).send(result)
  } catch (err) {
    res.status(500).send(err)
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  const users: Array<Users> = await User.find({})

  if (!users) {
    return res.status(404).send({
      message: 'No users found',
    })
  }

  res.json(users)
}

export const getUserById = async (req: Request, res: Response) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const user: Users | null = await User.findOne({ _id: req.params.id }).exec()

  if (!user) {
    return res.status(204).json({
      message: `No employee matches ID: ${req.params.id}.`,
    })
  }

  res.json(user)
}

export const updateUser = async (req: Request, res: Response) => {
  if (!req?.body?._id) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const user: Users | null = await User.findOne({ _id: req.body._id }).exec()

  if (!user) {
    return res.status(204).json({
      message: `No employee matches ID: ${req.body._id}.`,
    })
  }

  if (req.body?.firstName) user.firstName = req.body.firstName

  if (req.body?.lastName) user.lastName = req.body.lastName

  if (req.body?.userName) user.userName = req.body.userName

  if (req.body?.password) user.password = req.body.password

  if (req.body?.admin) user.roles.Admin = RoleNumbers.Admin

  if (req.body?.editor) user.roles.Editor = RoleNumbers.Editor

  if (req.body?.admin === false) user.roles.Admin = 0

  if (req.body?.editor === false) user.roles.Editor = 0

  const result = await user.save()

  res.json(result)
}

export const deleteUser = async (req: Request, res: Response) => {
  if (!req?.body?._id) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const user: Users | null = await User.findOne({ _id: req.body._id }).exec()

  if (!user) {
    return res.status(204).json({
      message: `No employee matches ID: ${req.body._id}.`,
    })
  }

  const result = await user.deleteOne({ _id: req.body._id })

  res.json(result)
}
