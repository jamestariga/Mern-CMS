import express, { Router } from 'express'
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../../Controller/userController'

const router: Router = express.Router()

router
  .route('/')
  .get(getAllUsers)
  .post(createUser)
  .put(updateUser)
  .delete(deleteUser)

router.route('/:id').get(getUserById)

export default router
