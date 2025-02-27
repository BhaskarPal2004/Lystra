import express from 'express'
import { signup } from '../controllers/authentication/signupController.js'

const authRoute = express.Router()

//all api's for authentications
authRoute.post('/signup/:role', signup)

export default authRoute