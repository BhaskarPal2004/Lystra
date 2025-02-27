import express from 'express'
import env from 'dotenv'
import { dbConnect } from './src/config/dbConnect.js'
import authRoute from './src/routes/authRoutes.js'

env.config({})

const app = express()
app.use(express.json())

const port = process.env.PORT || 5000

app.use('/api/auth', authRoute)

dbConnect()

app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})