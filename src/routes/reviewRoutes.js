import express from 'express'
import { verifyAccessToken } from '../middleware/isAuthenticated.js'
import { isSeller } from '../middleware/isSeller.js';
import isVerified from '../middleware/isVerified.js'
import deleteReview from '../controllers/reviewControllers/deleteReview.js';
import createReview from '../controllers/reviewControllers/createReview.js';
import updateReview from '../controllers/reviewControllers/updateReview.js';
import respondToReview from '../controllers/reviewControllers/respondToReview.js';
import deleteResponse from '../controllers/reviewControllers/deleteResponse.js';
import { validateData } from '../middleware/validateData.js';
import { reviewSchemaValidation } from '../validator/validateReview.js';
import { updateReviewSchemaValidation } from '../validator/validateReview.js';
import { createReply } from '../controllers/replyController/createReply.js';
import { replyValidation } from '../validator/validateReply.js';
import { getAllReply } from '../controllers/replyController/getAllReply.js';
import { handelReviewLikes } from '../controllers/reviewControllers/handelReviewLikes.js';
import getReview from '../controllers/reviewControllers/getReview.js';


const reviewRoute = express.Router();

//all api's of buyer
reviewRoute.post('/create/:adId', verifyAccessToken, isVerified, validateData(reviewSchemaValidation), createReview);
reviewRoute.delete('/delete/:reviewId', verifyAccessToken, isVerified, deleteReview);
reviewRoute.put('/edit/:reviewId', verifyAccessToken, isVerified, validateData(updateReviewSchemaValidation), updateReview);
reviewRoute.post('/respond/:reviewId', verifyAccessToken, isVerified, isSeller, respondToReview);
reviewRoute.delete('/deleteResponse/:reviewId', verifyAccessToken, isVerified, isSeller, deleteResponse);
reviewRoute.post('/reply/:reviewId', verifyAccessToken, isVerified, validateData(replyValidation), createReply);
reviewRoute.get('/getAllReply/:reviewId', verifyAccessToken, isVerified, getAllReply);
reviewRoute.post('/handleReviewLikes/:reviewId', verifyAccessToken, isVerified, handelReviewLikes);
reviewRoute.get('/getReview', verifyAccessToken, isVerified, getReview);



export default reviewRoute;