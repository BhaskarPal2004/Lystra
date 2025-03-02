import express from 'express'
import reviewAd from '../controllers/reviewControllers/reviewAd.js'
import { verifyAccessToken } from '../middleware/isAuthenticated.js'
import isVerified from '../middleware/isVerified.js'
import deleteReview from '../controllers/reviewControllers/deleteReview.js';
import editReview from '../controllers/reviewControllers/editReview.js';

const reviewRoute = express.Router();

//all api's of buyer
reviewRoute.post('/create/:adId', verifyAccessToken, isVerified, reviewAd);
reviewRoute.delete('/delete/:reviewId', verifyAccessToken, isVerified, deleteReview);
reviewRoute.put('/edit/:reviewId', verifyAccessToken, isVerified, editReview);

export default reviewRoute;