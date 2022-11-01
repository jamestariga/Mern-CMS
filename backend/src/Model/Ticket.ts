import { Schema, model } from 'mongoose'

interface Ticket {
  title: string
  description: string
  status: string
  priority: string
  type: string
}

const TicketSchema = new Schema<Ticket>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})

export default model<Ticket>('Ticket', TicketSchema)
