import express from 'express'
import { getAllAds } from '../controllers/adControllers/getAllAds.js';
import {verifyAccessToken} from "../middleware/isAuthenticated.js"
import { createNewAd } from '../controllers/adControllers/createNewAd.js'
import { validateData } from "../middleware/validateData.js"
import { adSchema } from '../validator/validateAd.js'
import { isSeller } from '../middleware/isSeller.js'
import { deleteAd } from '../controllers/adControllers/deleteAd.js';
import isVerified from '../middleware/isVerified.js';
import { getAdById } from '../controllers/adControllers/getAdById.js';

const adRoute = express.Router()

//all api's of ad
adRoute.post('/create',verifyAccessToken,isSeller,validateData(adSchema),createNewAd)

// Route to get all ads
adRoute.get('/getAllAds', getAllAds);

// Route to delete an ad by ID
adRoute.delete('/deleteAd/:id', verifyAccessToken, isVerified, isSeller, deleteAd);
// Route to get an ad by ID
adRoute.get('/getAdById/:id', getAdById);

export default adRoute