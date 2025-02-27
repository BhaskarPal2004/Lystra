import express from 'express'
import {verifyAccessToken} from "../middleware/isAuthenticated.js"
import { createNewAd } from '../controllers/AdControllers/createNewAd.js'
import { validateData } from "../middleware/validateData.js"
import { adSchema } from '../validator/validateAd.js'
import { isSeller } from '../middleware/isSeller.js'


const adRoute = express.Router()

//all api's of ad
adRoute.post('/create',verifyAccessToken,isSeller,validateData(adSchema),createNewAd)

export default adRoute