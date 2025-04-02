import express from 'express'

import { verifyAccessToken } from "../middleware/isAuthenticated.js"
import { createNewAd } from '../controllers/adControllers/createNewAd.js'
import { validateData } from "../middleware/validateData.js"
import { adSchema, updateAdSchema } from '../validator/validateAd.js'
import { isSeller } from '../middleware/isSeller.js'
import { deleteAd } from '../controllers/adControllers/deleteAd.js';
import { updateAd } from '../controllers/adControllers/updateAd.js';
import { getAdById } from '../controllers/adControllers/getAdById.js';
import { deleteAllAds } from '../controllers/adControllers/deleteAllAds.js';
import isVerified from '../middleware/isVerified.js';
import { uploadAdFiles } from '../middleware/multers/adFilesMulter.js';
import { setFeature } from '../controllers/adControllers/setFeature.js';
import { removeFeature } from '../controllers/adControllers/removeFeature.js';
import { compareAds } from '../controllers/adControllers/compareAds.js';
import { getAllOrdersOnAd } from '../controllers/adControllers/getAllOrdersOnAd.js';
import { getNewAds } from '../controllers/adControllers/getNewAds.js'
import { renewAd } from '../controllers/adControllers/renewAd.js';
import { getFeaturedAds } from '../controllers/adControllers/getFeaturedAds.js'
import { getCategories } from '../controllers/adControllers/getCategories.js'
import { getAllAds } from '../controllers/buyerControllers/getAllAds.js'
import { typeChange } from '../helper/typeChange.js'


const adRoute = express.Router()

//all api's of ad
adRoute.get('/getNewAds', getNewAds);
adRoute.get('/getFeaturedAds', getFeaturedAds);
adRoute.get('/getAdById/:adId', getAdById);
adRoute.get('/getAllAds', verifyAccessToken, isVerified, getAllAds)
adRoute.post('/create', verifyAccessToken, isVerified, isSeller, uploadAdFiles, typeChange, validateData(adSchema), createNewAd)
adRoute.put('/update/:adId', verifyAccessToken, isSeller, uploadAdFiles, typeChange, validateData(updateAdSchema), updateAd)
adRoute.delete('/deleteAd/:adId', verifyAccessToken, isVerified, isSeller, deleteAd);
adRoute.delete('/deleteAllAds', verifyAccessToken, isVerified, isSeller, deleteAllAds)
// adRoute.post('/uploadFiles/:adId', verifyAccessToken, isVerified, isSeller, uploadAdFiles, uploadAdFilesController)
adRoute.get('/compareAds/:adIds', verifyAccessToken, isVerified, compareAds);
adRoute.post('/featured/:adIds', verifyAccessToken, isVerified, isSeller, setFeature);
adRoute.delete('/removeFeature/:adId', verifyAccessToken, isVerified, isSeller, removeFeature);
adRoute.get('/getAllOrdersOnAd/:adId', verifyAccessToken, isVerified, isSeller, getAllOrdersOnAd);
adRoute.put('/renewAd/:adId', verifyAccessToken, isVerified, isSeller, renewAd);
adRoute.get('/getCategory', getCategories);


export default adRoute