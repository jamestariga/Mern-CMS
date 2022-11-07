import User, { Users } from '../Model/User'

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
    password?: string
    _id: string
  }
  params: {
    id: string
  }
}

export const createUser = async (req: Request, res: Response) => {
  if (
    !req?.body?.firstName ||
    !req?.body?.lastName ||
    !req?.body?.userName ||
    !req?.body?.password
  ) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  // check if user already exists
  const user = await User.findOne({ userName: req.body.userName })

  if (user) {
    return res.status(400).json({ message: 'User already exists' })
  }

  try {
    const result: Users = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
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
