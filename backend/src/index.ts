import * as dotenv from 'dotenv'
dotenv.config()
import express, { Express, Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import credentials from './Middleware/credentials'
import corsOption from './Configs/corsOptions'
import connectDB from './Configs/dbConn'
import user from './Routes/api/users'
import ticket from './Routes/api/tickets'
import product from './Routes/api/product'
import publicProduct from './Routes/api/publicProduct'
import register from './Routes/register'
import auth from './Routes/auth'
import logout from './Routes/logout'
import refresh from './Routes/refresh'
import verifyJWT from './Middleware/verifyJWT'

const PORT = process.env.PORT || 3001

connectDB()

const app: Express = express()

// Handle options credentials check before CORS and fetch cookies credentials requirement
app.use(credentials)

// Cors middleware
app.use(cors(corsOption))

// Body parser middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Cookie parser middleware
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'Hello World',
  })
})

app.use('/register', register)
app.use('/auth', auth)
app.use('/logout', logout)
app.use('/refresh', refresh)
app.use('/publicProducts', publicProduct)

app.use(verifyJWT)

app.use('/product', product)
app.use('/user', user)
app.use('/ticket', ticket)

mongoose.connection.once('open', () => {
  console.log('Connected to database')
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
})
