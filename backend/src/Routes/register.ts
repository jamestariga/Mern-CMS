import { handleNewUser } from '../Controller/registerController'
import express, { Router } from 'express'

const router: Router = express.Router()

router.post('/', handleNewUser)

export default router
