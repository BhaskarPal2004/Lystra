import express from 'express'
import isVerified from '../middleware/isVerified.js';
import { verifyAccessToken } from '../middleware/isAuthenticated.js';
import { findUserData } from '../controllers/userControllers/getUserData.js';

const userRoute = express.Router()

//all api's of user
userRoute.post('');
userRoute.get('/userData',verifyAccessToken,isVerified,findUserData);

export default userRoute