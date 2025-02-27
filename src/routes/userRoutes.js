import express from 'express'
import isVerified from '../middleware/isVerified';
import { verifyAccessToken } from '../middleware/isAuthenticated';
import { findUserData } from '../controllers/userControllers/getUserData';

const userRoute = express.Router()

//all api's of user
userRoute.post('');
userRoute.get('/userData',verifyAccessToken,isVerified,findUserData);

export default userRoute