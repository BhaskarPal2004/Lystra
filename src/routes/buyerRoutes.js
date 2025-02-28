import express from 'express'
import reviewAd from '../controllers/buyerControllers/reviewAd.js'
import { verifyAccessToken } from '../middleware/isAuthenticated.js'
import isVerified from '../middleware/isVerified.js'

const buyerRoute = express.Router()

//all api's of buyer
buyerRoute.post('/', (req, res) => { res.send("abc") })
//api to add review about an Ad
buyerRoute.post('/review/:adId', verifyAccessToken, isVerified, reviewAd);

export default buyerRoute