import express, { Router } from 'express'
import { handleLogout } from '../Controller/logoutController'

const router: Router = express.Router()

router.get('/', handleLogout)

export default router
