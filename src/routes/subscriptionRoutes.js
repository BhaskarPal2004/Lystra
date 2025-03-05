import express from 'express'
import { createSubscription } from '../controllers/subscriptionControllers/createSubscription.js'
import { verifyAccessToken } from '../middleware/isAuthenticated.js'
import isVerified from '../middleware/isVerified.js'
import { isSeller } from '../middleware/isSeller.js'

const subscriptionRoute = express.Router()

//all api's of seller
subscriptionRoute.post('/createSubscription/:paymentId',verifyAccessToken,isVerified,isSeller,createSubscription)

export default subscriptionRoute