import express from 'express'
import isVerified from '../middleware/isVerified.js';
import { verifyAccessToken } from '../middleware/isAuthenticated.js';
import { findUserData } from '../controllers/userControllers/getUserData.js';
import updateProfile from '../controllers/userControllers/updateProfile.js';
import { createAddReport } from '../controllers/userControllers/createAddReport.js';


const userRoute = express.Router();

//all api's of user
userRoute.post('');
userRoute.get('/userData',verifyAccessToken,isVerified,findUserData);
userRoute.put('/updateProfile',verifyAccessToken,isVerified,updateProfile);
userRoute.post('/report/:adId',verifyAccessToken, isVerified,createAddReport);

export default userRoute