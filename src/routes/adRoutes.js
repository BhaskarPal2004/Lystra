import express from 'express'

import { getAllAds } from '../controllers/adControllers/getAllAds.js';
import { verifyAccessToken } from "../middleware/isAuthenticated.js"
import { createNewAd } from '../controllers/adControllers/createNewAd.js'
import { validateData } from "../middleware/validateData.js"
import { adSchema, renewAdSchema, updateAdSchema } from '../validator/validateAd.js'
import { isSeller } from '../middleware/isSeller.js'
import { deleteAd } from '../controllers/adControllers/deleteAd.js';
import { updateAd } from '../controllers/adControllers/updateAd.js';
import { getAdById } from '../controllers/adControllers/getAdById.js';
import { deleteAllAds } from '../controllers/adControllers/deleteAllAds.js';
import isVerified from '../middleware/isVerified.js';
import { uploadAdFilesController } from '../controllers/adControllers/uploadAdFilesController.js';
import { uploadAdFiles } from '../middleware/multers/adFilesMulter.js';
import { setFeature } from '../controllers/adControllers/setFeature.js';
import { removeFeature } from '../controllers/adControllers/removeFeature.js';
import { compareAds } from '../controllers/adControllers/compareAds.js';
import { getAllOrdersOnAd } from '../controllers/adControllers/getAllOrdersOnAd.js';


const adRoute = express.Router()

//all api's of ad
adRoute.get('/getAllAds', getAllAds);
adRoute.get('/getAdById/:adId', getAdById);
adRoute.post('/create', verifyAccessToken, isSeller,validateData(adSchema),createNewAd)
adRoute.put('/update/:adId', verifyAccessToken, isSeller,validateData(updateAdSchema),updateAd)
adRoute.put('/renew/:adId', verifyAccessToken, isSeller, validateData(renewAdSchema), updateAd)
adRoute.delete('/deleteAd/:adId', verifyAccessToken, isVerified, isSeller, deleteAd);
adRoute.delete('/deleteAllAds', verifyAccessToken, isVerified, isSeller, deleteAllAds)
adRoute.post('/uploadFiles/:adId', verifyAccessToken, isVerified, isSeller, uploadAdFiles, uploadAdFilesController)
adRoute.get('/compareAds/:adIds', verifyAccessToken, isVerified,compareAds );
adRoute.post('/featured/:adIds',verifyAccessToken,isVerified,isSeller,setFeature);
adRoute.delete('/removeFeature/:adId',verifyAccessToken,isVerified,isSeller,removeFeature);
adRoute.get('/getAllOrdersOnAd/:adId',verifyAccessToken,isVerified,isSeller,getAllOrdersOnAd);




export default adRoute

