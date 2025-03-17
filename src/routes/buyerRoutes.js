import express from 'express'
import { verifyAccessToken } from '../middleware/isAuthenticated.js'
import isVerified from '../middleware/isVerified.js'
import saveAd from '../controllers/buyerControllers/saveAd.js'
import removeSavedAd from '../controllers/buyerControllers/removeSavedAd.js'
import addInterests from '../controllers/buyerControllers/addInterests.js'
import { getAdsByLocation } from '../controllers/buyerControllers/getAdsByLocation.js'
import { browseAds } from '../controllers/buyerControllers/browseAds.js'
import { getAllReview } from '../controllers/buyerControllers/getAllReview.js'
import { getTransactions } from '../controllers/buyerControllers/getTransaction.js'

const buyerRoute = express.Router()

//all api's of buyer
buyerRoute.post('/saveAd/:adId', verifyAccessToken, isVerified, saveAd);
buyerRoute.delete('/removeSavedAd/:adId', verifyAccessToken, isVerified, removeSavedAd);
buyerRoute.post('/interest', verifyAccessToken, isVerified, addInterests);
buyerRoute.get('/ads/location', verifyAccessToken, isVerified, getAdsByLocation);
buyerRoute.get('/getAdsByInterest', verifyAccessToken, isVerified, browseAds);
buyerRoute.get('/getAllReview/:buyerId', verifyAccessToken, isVerified, getAllReview);
buyerRoute.get('/transaction',verifyAccessToken,isVerified,getTransactions)


export default buyerRoute