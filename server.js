import express from 'express'
import env from 'dotenv'
import { dbConnect } from './src/config/dbConnect.js'
import authRoute from './src/routes/authRoutes.js'
import userRoute from './src/routes/userRoutes.js'

import adRoute from './src/routes/adRoutes.js'
import sellerRoute from './src/routes/sellerRoutes.js'
import reviewRoute from './src/routes/reviewRoutes.js'
import buyerRoute from './src/Routes/buyerRoutes.js'

env.config({})

const app = express()
app.use(express.json())
app.use('/uploads', express.static('uploads'))

const port = process.env.PORT || 5000

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/buyer', buyerRoute)
app.use('/api/seller', sellerRoute)
app.use('/api/ad', adRoute)
app.use('/api/review', reviewRoute)

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