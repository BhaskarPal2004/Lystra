import express from 'express'
import regenerateTokens from '../controllers/authControllers/regenerateTokens.js'
import { verifyRefreshToken } from '../middleware/isAuthenticated.js'
import { signup } from '../controllers/authControllers/signupController.js'
const authRoute = express.Router()

//all api's for authentications
authRoute.post('/signup/:role', signup)
authRoute.get('/accessToken',verifyRefreshToken ,regenerateTokens);
export default authRoute