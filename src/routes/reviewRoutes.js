import express from 'express'
import { verifyAccessToken } from '../middleware/isAuthenticated.js'
import { isSeller } from '../middleware/isSeller.js';
import isVerified from '../middleware/isVerified.js'
import deleteReview from '../controllers/reviewControllers/deleteReview.js';
import createReview from '../controllers/reviewControllers/createReview.js';
import updateReview from '../controllers/reviewControllers/updateReview.js';
import respondToReview from '../controllers/reviewControllers/respondToReview.js';
import deleteResponse from '../controllers/reviewControllers/deleteResponse.js';


const reviewRoute = express.Router();

//all api's of buyer
reviewRoute.post('/create/:sellerId', verifyAccessToken, isVerified, createReview);
reviewRoute.delete('/delete/:reviewId', verifyAccessToken, isVerified, deleteReview);
reviewRoute.put('/edit/:reviewId', verifyAccessToken, isVerified, updateReview);
reviewRoute.post('/respond/:reviewId', verifyAccessToken, isSeller, isVerified, respondToReview);
reviewRoute.delete('/deleteResponse/:reviewId', verifyAccessToken, isSeller, isVerified, deleteResponse);


export default reviewRoute;