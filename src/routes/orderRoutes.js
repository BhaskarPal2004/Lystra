import express from "express";
import { verifyAccessToken } from "../middleware/isAuthenticated.js";
import isVerified from "../middleware/isVerified.js";
import { getOrders } from "../controllers/orderControllers/getOrders.js";

const orderRoute = express.Router()

orderRoute.get('/getOrders/', verifyAccessToken, isVerified, getOrders)


export default orderRoute