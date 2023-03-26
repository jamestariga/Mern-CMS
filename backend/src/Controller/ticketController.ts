import Ticket, { Tickets } from '../Model/Ticket'

enum priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

enum status {
  Open = 'Open',
  Progress = 'Progress',
  Closed = 'Closed',
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

interface ITicket {
  title: string
  description: string
  status: status
  priority: priority
  type: string
}

export const createTicket = async (req: Request, res: Response) => {
  const {
    title,
    description,
    status: ticketStatus,
    priority: ticketPriority,
    type,
  }: any = req.body

  if (!title) {
    return res.status(400).json({ message: 'Missing title fields' })
  }

  if (!description) {
    return res.status(400).json({ message: 'Missing description fields' })
  }

  if (!ticketStatus) {
    return res.status(400).json({ message: 'Missing status fields' })
  }

  if (!ticketPriority) {
    return res.status(400).json({ message: 'Missing priority fields' })
  }

  if (!(ticketPriority in priority)) {
    return res
      .status(400)
      .json({ message: 'Priority must be low, medium, or high' })
  }

  if (!(ticketStatus in status)) {
    return res
      .status(400)
      .json({ message: 'Status must be open, in progress, or closed' })
  }

  try {
    const result: Tickets = await Ticket.create({
      title,
      description,
      status: ticketStatus,
      priority: ticketPriority,
      type,
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
    req?.body?.priority !== priority.Low &&
    req?.body?.priority !== priority.Medium &&
    req?.body?.priority !== priority.High
  ) {
    return res
      .status(400)
      .json({ message: 'Priority must be low, medium, or high' })
  }

  if (
    req?.body?.status !== status.Open &&
    req?.body?.status !== status.Progress &&
    req?.body?.status !== status.Closed
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
