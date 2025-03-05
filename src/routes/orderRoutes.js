import express from "express";
import { createOrder } from "../controllers/orderControllers/createOrder.js";
import { verifyAccessToken } from "../middleware/isAuthenticated.js";
import isVerified from "../middleware/isVerified.js";

const orderRoute = express.Router()

orderRoute.post('/create/:adId', verifyAccessToken, isVerified, createOrder)


export default orderRoute