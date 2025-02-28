import express from 'express'
import { verifyAccessToken } from '../middleware/isAuthenticated.js'
import isVerified from '../middleware/isVerified.js'

const buyerRoute = express.Router()

//all api's of buyer
buyerRoute.post('/', (req, res) => { res.send("abc") })

export default buyerRoute