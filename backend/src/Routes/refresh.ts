import express, { Router } from 'express'
import { handleRefreshToken } from '../Controller/refreshTokenController'

const router: Router = express.Router()

router.get('/', handleRefreshToken)

export default router
