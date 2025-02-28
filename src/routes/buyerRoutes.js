import express from 'express'
import { verifyAccessToken } from '../middleware/isAuthenticated.js'
import isVerified from '../middleware/isVerified.js'
import saveAd from '../controllers/buyerControllers/saveAd.js'
import removeSavedAd from '../controllers/buyerControllers/removeSavedAd.js'

const buyerRoute = express.Router()

//all api's of buyer
buyerRoute.post('/', (req, res) => { res.send("abc") })
buyerRoute.post('/saveAd/:adId', verifyAccessToken, isVerified, saveAd);
buyerRoute.delete('/removeSavedAd/:adId', verifyAccessToken, isVerified, removeSavedAd);
export default buyerRoute