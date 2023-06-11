import express, { Router } from 'express'
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from '../../Controller/ticketController'
import verifyRoles from '../../Middleware/verifyRoles'
import ROLES_LIST from '../../Configs/rolesList'

const router: Router = express.Router()

router
  .route('/')
  .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), getAllTickets)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User),
    createTicket
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User),
    updateTicket
  )

router
  .route('/:id')
  .get(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User),
    getTicketById
  )
  .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), deleteTicket)

export default router
