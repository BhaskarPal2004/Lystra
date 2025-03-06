import express from 'express'
import env from 'dotenv'
import { dbConnect } from './src/config/dbConnect.js'
import authRoute from './src/routes/authRoutes.js'
import userRoute from './src/routes/userRoutes.js'

import adRoute from './src/routes/adRoutes.js'
import sellerRoute from './src/routes/sellerRoutes.js'
import reviewRoute from './src/routes/reviewRoutes.js'
import buyerRoute from './src/routes/buyerRoutes.js'

import cors from 'cors'
import Razorpay from 'razorpay'
import paymentRoute from './src/routes/paymentRoute.js'
import { SUCCESS_CODE } from './src/config/constant.js'

env.config({})

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/uploads', express.static('uploads'))
app.use(cors())

const port = process.env.PORT || 5000

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/buyer', buyerRoute)
app.use('/api/seller', sellerRoute)
app.use('/api/ad', adRoute)
app.use('/api/review', reviewRoute)
app.use('/api/payment', paymentRoute)

dbConnect()

app.use(express.json())

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${port} is already in use!`);
    console.log("Retrying in 5 seconds...");
    setTimeout(() => {
      process.exit(1)
    }, 5000);
  }
});

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.get('/api/payment/getKey', (req,res) => {
  res.status(SUCCESS_CODE).json({ key: process.env.RAZORPAY_API_KEY })
})