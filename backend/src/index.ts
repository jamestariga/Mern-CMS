import * as dotenv from 'dotenv'
dotenv.config()
import express, { Express, Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import credentials from './Middleware/credentials'
import corsOption from './Configs/corsOptions'
import connectDB from './Configs/dbConn'
import user from './Routes/api/users'

const PORT = process.env.PORT || 3001

connectDB()

const app: Express = express()

// Handle options credentials check before CORS and fetch cookies credentials requirement
app.use(credentials)

// Cors middleware
app.use(cors(corsOption))

// Body parser middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'Hello World',
  })
})

app.use('/user', user)

mongoose.connection.once('open', () => {
  console.log('Connected to database')
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
})
