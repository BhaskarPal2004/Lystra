import express from 'express'
import env from 'dotenv'
import { dbConnect } from './src/config/dbConnect.js'
import authRoute from './src/routes/authRoutes.js'
import userRoute from './src/routes/userRoutes.js'
import buyerRoute from './src/routes/buyerRoutes.js'
import sellerRoute from './src/routes/sellerRoute.js'
import adRoute from './src/routes/adRoutes.js'
import reviewRoute from './src/routes/reviewRoute.js'

env.config({})

const app = express()
app.use(express.json())

const port = process.env.PORT || 5000

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/buyer', buyerRoute)
app.use('/api/seller', sellerRoute)
app.use('/api/ad', adRoute)
app.use('/api/review',reviewRoute)

dbConnect()

app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})