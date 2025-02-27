import express from 'express'
const authRoute = express.Router()
import { signup } from '../controllers/authControllers/signupController.js'
import { signUpValidation } from '../validator/validateSignup.js'
import { validateData } from "../middleware/validateData.js"
import regenerateTokens from '../controllers/authControllers/regenerateTokens.js'
import { verifyRefreshToken, verifyRegistrationToken } from '../middleware/isAuthenticated.js'
import isVerified from '../middleware/isVerified.js'
import { login } from '../controllers/authControllers/loginController.js'
import verifyUser from '../controllers/authControllers/verifyUser.js'


//all api's for authentications

authRoute.post('/signup/:role', validateData(signUpValidation), signup)
authRoute.get('/accessToken', verifyRefreshToken, isVerified, regenerateTokens);
authRoute.post('/login', login)
authRoute.post('/verifyUser/:registrationToken', verifyRegistrationToken, verifyUser);
export default authRoute