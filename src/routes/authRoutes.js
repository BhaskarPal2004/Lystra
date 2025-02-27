import express from 'express'
const authRoute = express.Router()
import { signup } from '../controllers/authControllers/signupController.js'
import { signUpValidation } from '../validator/validateSignup.js'
import {validateData} from "../middleware/validateData.js"
import regenerateTokens from '../controllers/authControllers/regenerateTokens.js'
import { verifyRefreshToken } from '../middleware/isAuthenticated.js'
import isVerified from '../middleware/isVerified.js'


//all api's for authentications

authRoute.post('/signup/:role',validateData(signUpValidation),signup)
authRoute.get('/accessToken', verifyRefreshToken, isVerified, regenerateTokens);
export default authRoute