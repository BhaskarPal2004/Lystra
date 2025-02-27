import express from 'express'
import { signup } from '../controllers/authControllers/signupController.js'
import { signUpValidation } from '../validator/validateSignup.js'
import {validateData} from "../middleware/validateData.js"


const authRoute = express.Router()

//all api's for authentications
authRoute.post('/signup/:role',validateData(signUpValidation),signup)

export default authRoute