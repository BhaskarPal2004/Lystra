import express from 'express'
import { paymentCheckout } from '../controllers/paymentControllers/paymentCheckout.js'

const paymentRoute = express.Router()

paymentRoute.post('/paymentCheckout', paymentCheckout)

export default paymentRoute