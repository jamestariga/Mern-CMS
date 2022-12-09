import Ticket, { Tickets } from '../Model/Ticket'

enum priority {
  low = 'Low',
  medium = 'Medium',
  high = 'High',
}

enum status {
  open = 'Open',
  inProgress = 'In Progress',
  closed = 'Closed',
}

interface Response {
  status: (code: number) => Response
  send: (data: any) => Response
  json: (data: any) => Response
}

interface Request {
  body: {
    title: string
    description: string
    status: status
    priority: priority
    type: string
    _id: string
  }
  params: {
    id: string
  }
}

export const createTicket = async (req: Request, res: Response) => {
  if (
    !req?.body?.title ||
    !req?.body?.description ||
    !req?.body?.status ||
    !req?.body?.priority ||
    !req?.body?.type
  ) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  if (
    req?.body?.priority !== priority.low &&
    req?.body?.priority !== priority.medium &&
    req?.body?.priority !== priority.high
  ) {
    return res
      .status(400)
      .json({ message: 'Priority must be low, medium, or high' })
  }

  if (
    req?.body?.status !== status.open &&
    req?.body?.status !== status.inProgress &&
    req?.body?.status !== status.closed
  ) {
    return res
      .status(400)
      .json({ message: 'Status must be open, in progress, or closed' })
  }

  try {
    const result: Tickets = await Ticket.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      type: req.body.type,
    })
    res.status(201).send(result)
  } catch (err) {
    res.status(500).send(err)
  }
}

export const getAllTickets = async (req: Request, res: Response) => {
  const tickets: Array<Tickets> = await Ticket.find({}).exec()

  if (!tickets) {
    return res.status(404).send({
      message: 'No tickets found',
    })
  }

  res.json({ data: tickets })
}

export const getTicketById = async (req: Request, res: Response) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const ticket: Tickets | null = await Ticket.findOne({
    _id: req.params.id,
  }).exec()

  if (!ticket) {
    return res.status(204).json({
      message: `No ticket matches ID: ${req.params.id}.`,
    })
  }

  res.json(ticket)
}

export const updateTicket = async (req: Request, res: Response) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  if (
    req?.body?.priority !== priority.low &&
    req?.body?.priority !== priority.medium &&
    req?.body?.priority !== priority.high
  ) {
    return res
      .status(400)
      .json({ message: 'Priority must be low, medium, or high' })
  }

  if (
    req?.body?.status !== status.open &&
    req?.body?.status !== status.inProgress &&
    req?.body?.status !== status.closed
  ) {
    return res
      .status(400)
      .json({ message: 'Status must be open, in progress, or closed' })
  }

  const ticket: Tickets | null = await Ticket.findOne({
    _id: req.params.id,
  }).exec()

  if (!ticket) {
    return res.status(204).json({
      message: `No ticket matches ID: ${req.params.id}.`,
    })
  }

  if (req.body?.title) ticket.title = req.body.title

  if (req.body?.description) ticket.description = req.body.description

  if (req.body?.status) ticket.status = req.body.status

  if (req.body?.priority) ticket.priority = req.body.priority

  if (req.body?.type) ticket.type = req.body.type

  const result = await ticket.save()

  res.json(result)
}

export const deleteTicket = async (req: Request, res: Response) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const ticket: Tickets | null = await Ticket.findOne({
    _id: req.params.id,
  }).exec()

  if (!ticket) {
    return res.status(204).json({
      message: `No ticket matches ID: ${req.params.id}.`,
    })
  }

  const result = await ticket.remove()

  res.json(result)
}
