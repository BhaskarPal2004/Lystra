import express from 'express'
import isVerified from '../middleware/isVerified.js';
import { validateData } from '../middleware/validateData.js';
import { profileUpdateValidation } from '../validator/validateProfileUpdate.js';
import { verifyAccessToken } from '../middleware/isAuthenticated.js';
import { findUserData } from '../controllers/userControllers/getUserData.js';
import updateProfile from '../controllers/userControllers/updateProfile.js';
import logout from '../controllers/userControllers/logout.js';
import { uploadProfilePicture } from '../middleware/multers/profilePictureMulter.js';
import { uploadProfilePictureController } from '../controllers/userControllers/uploadProfilePictureController.js';
import { createAdReport } from '../controllers/userControllers/createAdReport.js';

const userRoute = express.Router();

//all api's of user
userRoute.get('/userData', verifyAccessToken, isVerified, findUserData);
userRoute.put('/updateProfile', verifyAccessToken, isVerified, validateData(profileUpdateValidation), updateProfile);
userRoute.post('/report/:adId', verifyAccessToken, isVerified, createAdReport);
userRoute.delete('/logout', verifyAccessToken, isVerified, logout)
userRoute.post('/uploadProfilePicture', verifyAccessToken, isVerified, uploadProfilePicture, uploadProfilePictureController);

export default userRoute