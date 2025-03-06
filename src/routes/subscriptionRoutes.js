import express from 'express'
import { createSubscription } from '../controllers/subscriptionControllers/createSubscription.js'
import { verifyAccessToken } from '../middleware/isAuthenticated.js'
import isVerified from '../middleware/isVerified.js'
import { isSeller } from '../middleware/isSeller.js'
import { renewSubscription } from '../controllers/subscriptionControllers/renewSubscription.js'


const subscriptionRoute = express.Router()

//all api's of subscription
subscriptionRoute.post('/createSubscription/:paymentId',verifyAccessToken,isVerified,isSeller,createSubscription);
subscriptionRoute.post('/renew/:subscriptionId',verifyAccessToken,isVerified,isSeller,renewSubscription);

export default subscriptionRoute