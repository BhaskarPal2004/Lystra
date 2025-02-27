import express from 'express'
import { signup } from '../controllers/authentication/signupController.js'
import regenerateAccessToken from '../controllers/authControllers/regenerateAccessToken.js'
import { verifyRefreshToken } from '../middleware/isAuthenticated.js'
const authRoute = express.Router()

//all api's for authentications
authRoute.post('/signup/:role', signup)
authRoute.get('/accessToken',verifyRefreshToken ,regenerateAccessToken);
export default authRoute