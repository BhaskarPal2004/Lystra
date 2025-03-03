import express from 'express'

import { getAllAds } from '../controllers/adControllers/getAllAds.js';
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
import { uploadAdPhotos } from '../middleware/multers/adPhotosMulter.js';
import { uploadAdPhotosController } from '../controllers/adControllers/uploadAdPhotosController.js';


const adRoute = express.Router()

//all api's of ad
adRoute.get('/getAllAds', getAllAds);
adRoute.get('/getAdById/:adId', getAdById);
adRoute.post('/create', verifyAccessToken, isSeller, validateData(adSchema), createNewAd)
adRoute.put('/update/:adId', verifyAccessToken, isSeller, validateData(updateAdSchema), updateAd)
adRoute.delete('/deleteAd/:adId', verifyAccessToken, isVerified, isSeller, deleteAd);
adRoute.delete('/deleteAllAds', verifyAccessToken, isVerified, isSeller, deleteAllAds)
adRoute.post('/uploadPhoto/:adId', verifyAccessToken, isVerified, isSeller, uploadAdPhotos, uploadAdPhotosController)


export default adRoute