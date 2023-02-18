import express, { Router } from 'express'
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../../Controller/userController'
import verifyRoles from '../../Middleware/verifyRoles'
import ROLES_LIST from '../../Configs/rolesList'

const router: Router = express.Router()

router
  .route('/')
  .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), getAllUsers)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createUser)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateUser)
  .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), deleteUser)

router
  .route('/:id')
  .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), getUserById)

export default router
