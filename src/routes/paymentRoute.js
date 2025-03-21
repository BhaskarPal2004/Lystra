import express from 'express'
import { paymentCheckout } from '../controllers/paymentControllers/paymentCheckout.js'
import { paymentVerification } from '../controllers/paymentControllers/paymentVerification.js'
import { paymentFailedUpdate } from '../controllers/paymentControllers/paymentFailedUpdate.js'
import { boostedPaymentCheckout } from '../controllers/paymentControllers/boostedPaymentCheckout.js'
import { verifyAccessToken } from '../middleware/isAuthenticated.js'
import isVerified from '../middleware/isVerified.js'
import { isSeller } from '../middleware/isSeller.js'
import { boostedPaymentVerification } from '../controllers/paymentControllers/boostedPaymentVerification.js'

const paymentRoute = express.Router()

paymentRoute.post('/boost/ad/payment/checkout/:adId', verifyAccessToken, isVerified, isSeller, boostedPaymentCheckout)
paymentRoute.post('/boost/ad/payment/verification/:adId/:amount/:days', boostedPaymentVerification)
paymentRoute.post('/paymentCheckout/:adId', paymentCheckout)
paymentRoute.post('/paymentVerification', paymentVerification)
paymentRoute.post('/update/failed/payment/:razorpayOrderId/:razorpayPaymentId', paymentFailedUpdate)


export default paymentRoute