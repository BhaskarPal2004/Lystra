import express from 'express'
import cors from 'cors'
import './src/helper/cronJob.js'
import './src/config/envConfig.js';

import { dbConnect } from './src/config/dbConnect.js'
import { SUCCESS_CODE } from './src/config/constant.js'
import { app, server } from './src/config/socket.js'
import corsOptions from './src/config/corsConfig.js'
import routes from './src/routes/index.js';


const port = process.env.PORT || 5000

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))
app.use('/invoices', express.static('invoices'))

routes(app);

dbConnect()

server.listen(port, () => console.log(`Example app listening on port ${port}`))

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`Port ${port} is already in use. Retrying in 5 seconds...`);
    setTimeout(() => process.exit(1), 5000);
  }
});

app.get('/api/payment/getKey', (req, res) => {
  res.status(SUCCESS_CODE).json({ key: process.env.RAZORPAY_API_KEY })
})