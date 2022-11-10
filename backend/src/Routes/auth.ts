import express, { Router } from 'express'
import { handleLogin } from '../Controller/authController'

const router: Router = express.Router()

router.post('/', handleLogin)

export default router
