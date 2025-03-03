import express from 'express'
import { verifyAccessToken } from '../middleware/isAuthenticated.js'
import isVerified from '../middleware/isVerified.js'
import { isSeller } from '../middleware/isSeller.js'
import { getAllAds } from '../controllers/sellerControllers/getAllAds.js'

const sellerRoute = express.Router()

//all api's of seller
sellerRoute.get('/getAllAds', verifyAccessToken, isVerified, isSeller, getAllAds)

export default sellerRoute