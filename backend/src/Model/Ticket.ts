import { Schema, Document, Types, model } from 'mongoose'

export interface Tickets extends Document<Types.ObjectId> {
  title: string
  description: string
  status: string
  priority: string
  type: string
}

const TicketSchema = new Schema<Tickets>({
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

export default model<Tickets>('Ticket', TicketSchema)
