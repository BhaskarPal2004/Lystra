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
import { createUserReport } from '../controllers/userControllers/createUserReport.js';
import { blockedUser } from '../controllers/userControllers/blockedUser.js';

const userRoute = express.Router();

//all api's of user
userRoute.get('/userData', verifyAccessToken, isVerified, findUserData);
userRoute.put('/updateProfile', verifyAccessToken, isVerified, validateData(profileUpdateValidation), updateProfile);
userRoute.post('/report/:adId', verifyAccessToken, isVerified, createAdReport);
userRoute.post('/reportUser', verifyAccessToken, isVerified, createUserReport);
userRoute.delete('/logout', verifyAccessToken, isVerified, logout)
userRoute.post('/uploadProfilePicture', verifyAccessToken, isVerified, uploadProfilePicture, uploadProfilePictureController);
userRoute.post('/blockUser/:blockId',verifyAccessToken,isVerified,blockedUser);

export default userRoute