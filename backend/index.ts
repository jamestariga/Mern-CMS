import express from 'express'
import cors from 'cors'
import credentials from './Middleware/credentials'
import corsOption from './Configs/corsOptions'

const app = express()

// Handle options credentials check before CORS and fetch cookies credentials requirement
app.use(credentials)

// Cors middleware
app.use(cors(corsOption))

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3001, () => {
  console.log('Server started on port 3001')
})
