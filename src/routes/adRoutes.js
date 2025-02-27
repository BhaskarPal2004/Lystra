import express from 'express'
import { getAllAds } from '../controllers/adControllers/getAllAds.js';

const adRoute = express.Router()

//all api's of ad
adRoute.post('')

// Route to get all ads
adRoute.get('/getAllAds', getAllAds);

export default adRoute