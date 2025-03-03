import express from 'express'
import { verifyAccessToken } from '../middleware/isAuthenticated.js'
import isVerified from '../middleware/isVerified.js'
import deleteReview from '../controllers/reviewControllers/deleteReview.js';
import createReview from '../controllers/reviewControllers/createReview.js';
import updateReview from '../controllers/reviewControllers/updateReview.js';

const reviewRoute = express.Router();

//all api's of buyer
reviewRoute.post('/create/:sellerId', verifyAccessToken, isVerified, createReview);
reviewRoute.delete('/delete/:reviewId', verifyAccessToken, isVerified, deleteReview);
reviewRoute.put('/edit/:reviewId', verifyAccessToken, isVerified, updateReview);

export default reviewRoute;