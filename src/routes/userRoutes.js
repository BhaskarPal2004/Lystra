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
import { unBlockedUser } from '../controllers/userControllers/unBlockedUser.js';
import { updatePassword } from '../controllers/userControllers/updatePassword.js';
import { updatePasswordValidation } from "../validator/validateUpdatePassword.js"
import { getUserCoordinates } from '../controllers/userControllers/getUserCoordinates.js';
import { callRequest } from '../controllers/userControllers/callRequest.js';
import { adReportValidation } from '../validator/validateAdReport.js';
import saveAd from '../controllers/userControllers/saveAd.js';
import removeSavedAd from '../controllers/userControllers/removeSavedAd.js';
import getSavedAds from '../controllers/userControllers/getSavedAds.js';
import { getAllBlockedUser } from '../controllers/userControllers/getAllBlockedUser.js';
import getAllCities from '../controllers/userControllers/getAllCity.js';
import { getHighestAdPrice } from '../controllers/userControllers/getHeighesPrice.js';

const userRoute = express.Router();

//all api's of user
userRoute.get('/userData', verifyAccessToken, isVerified, findUserData);
userRoute.put('/updateProfile', verifyAccessToken, isVerified, validateData(profileUpdateValidation), updateProfile);
userRoute.post('/report/:adId', verifyAccessToken, isVerified, validateData(adReportValidation),createAdReport);
userRoute.post('/reportUser', verifyAccessToken, isVerified,createUserReport);
userRoute.delete('/logout', verifyAccessToken, isVerified, logout)
userRoute.post('/uploadProfilePicture', verifyAccessToken, isVerified, uploadProfilePicture, uploadProfilePictureController);
userRoute.post('/blockUser/:blockId', verifyAccessToken, isVerified, blockedUser);
userRoute.post('/unblockUser/:unBlockId', verifyAccessToken, isVerified, unBlockedUser);
userRoute.post('/updatePassword', verifyAccessToken, isVerified, validateData(updatePasswordValidation), updatePassword);
userRoute.get('/getCoordinates/:lat/:lng', getUserCoordinates)
userRoute.post('/request/call/:calleeId', verifyAccessToken, isVerified, callRequest);
userRoute.post('/saveAd/:adId', verifyAccessToken, isVerified, saveAd);
userRoute.delete('/removeSavedAd/:adId', verifyAccessToken, isVerified, removeSavedAd);
userRoute.get("/getSavedAds",verifyAccessToken,isVerified,getSavedAds);
userRoute.get("/getAllcities", verifyAccessToken, isVerified, getAllCities);
userRoute.get("/getHeighestPrice", verifyAccessToken, isVerified, getHighestAdPrice)

userRoute.get("/getBlockedUser/:blockerId", verifyAccessToken, isVerified, getAllBlockedUser);





export default userRoute