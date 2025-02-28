import express from 'express'
import { signup } from '../controllers/authControllers/signupController.js'
import { signUpValidation } from '../validator/validateSignup.js'
import { validateData } from "../middleware/validateData.js"
import regenerateTokens from '../controllers/authControllers/regenerateTokens.js'
import { verifyRefreshToken, verifyRegistrationToken } from '../middleware/isAuthenticated.js'
import isVerified from '../middleware/isVerified.js'
import { login } from '../controllers/authControllers/loginController.js'
import verifyUser from '../controllers/authControllers/verifyUser.js'
import { resendMail } from '../controllers/authControllers/resendMailController.js'
import { logInValidation } from '../validator/validateLogin.js'


const authRoute = express.Router()

//all api's for authentications
authRoute.post('/signup/:role', validateData(signUpValidation), signup)
authRoute.get('/accessToken', verifyRefreshToken, isVerified, regenerateTokens);
authRoute.post('/login/:role', validateData(logInValidation),login)
authRoute.post('/verifyUser/:registrationToken', verifyRegistrationToken, verifyUser);
authRoute.post('/resendMail', resendMail)

export default authRoute