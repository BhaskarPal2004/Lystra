import express from 'express'
import { paymentCheckout } from '../controllers/paymentControllers/paymentCheckout.js'
import { paymentVerification } from '../controllers/paymentControllers/paymentVerification.js'

const paymentRoute = express.Router()

paymentRoute.post('/paymentCheckout/:adId', paymentCheckout)
paymentRoute.post('/paymentVerification', paymentVerification)

export default paymentRoute