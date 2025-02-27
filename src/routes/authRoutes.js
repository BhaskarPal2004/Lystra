import express from 'express'
import { signup } from '../controllers/authControllers/signupController.js'
import { login } from '../controllers/authControllers/loginController.js'

const authRoute = express.Router()

//all api's for authentications
authRoute.post('/signup/:role', signup)
authRoute.post('/login', login)

export default authRoute