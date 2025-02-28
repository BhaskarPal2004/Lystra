import express from 'express'
import reviewAd from '../controllers/buyerControllers/reviewAd.js'
import { verifyAccessToken } from '../middleware/isAuthenticated.js'
import isVerified from '../middleware/isVerified.js'

const reviewRoute = express.Router();

//all api's of buyer
reviewRoute.post('/review/:adId', verifyAccessToken, isVerified, reviewAd);

export default reviewRoute