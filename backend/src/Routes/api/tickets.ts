import express, { Router } from 'express'
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from '../../Controller/ticketController'

const router: Router = express.Router()

router
  .route('/')
  .get(getAllTickets)
  .post(createTicket)
  .put(updateTicket)
  .delete(deleteTicket)

router.route('/:id').get(getTicketById)

export default router
