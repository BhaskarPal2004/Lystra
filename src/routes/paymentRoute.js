import express from 'express'
import { paymentCheckout } from '../controllers/paymentControllers/paymentCheckout.js'
import { paymentVerification } from '../controllers/paymentControllers/paymentVerification.js'
import { paymentFailedUpdate } from '../controllers/paymentControllers/paymentFailedUpdate.js'

const paymentRoute = express.Router()

paymentRoute.post('/paymentCheckout/:adId', paymentCheckout)
paymentRoute.post('/paymentVerification', paymentVerification)
paymentRoute.post('/update/failed/payment/:razorpayOrderId', paymentFailedUpdate)


export default paymentRoute