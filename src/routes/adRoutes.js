import express from 'express'
import { getAllAds } from '../controllers/adControllers/getAllAds.js';

import { verifyAccessToken } from "../middleware/isAuthenticated.js"
import { createNewAd } from '../controllers/adControllers/createNewAd.js'
import { validateData } from "../middleware/validateData.js"
import { adSchema, updateAdSchema } from '../validator/validateAd.js'
import { isSeller } from '../middleware/isSeller.js'
import { deleteAd } from '../controllers/adControllers/deleteAd.js';
import isVerified from '../middleware/isVerified.js';
import { updateAd } from '../controllers/adControllers/updateAd.js';
import { getAdById } from '../controllers/adControllers/getAdById.js';
import { deleteAllAds } from '../controllers/adControllers/deleteAllAds.js';
import isVerified from '../middleware/isVerified.js';

const adRoute = express.Router()

//all api's of ad
adRoute.post('/create', verifyAccessToken, isSeller, validateData(adSchema), createNewAd)

// Route to update ad by id
adRoute.post('/update/:id', verifyAccessToken, isSeller, validateData(updateAdSchema), updateAd)

// Route to get all ads
adRoute.get('/getAllAds', getAllAds);

// Route to delete an ad by ID
adRoute.delete('/deleteAd/:id', verifyAccessToken, isVerified, isSeller, deleteAd);
// Route to get an ad by ID
adRoute.get('/getAdById/:id', getAdById);

// Route to delete all ad
adRoute.delete('/deleteAllAds',verifyAccessToken, isVerified, isSeller,deleteAllAds)

export default adRoute