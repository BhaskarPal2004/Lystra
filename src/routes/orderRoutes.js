import express from "express";
import { verifyAccessToken } from "../middleware/isAuthenticated.js";
import isVerified from "../middleware/isVerified.js";
import { getOrders } from "../controllers/orderControllers/getOrders.js";
import { InvoiceCreation } from "../controllers/orderControllers/createInvoice.js";

const orderRoute = express.Router()

orderRoute.get('/getOrders/', verifyAccessToken, isVerified, getOrders)
orderRoute.get('/invoice/:orderId',verifyAccessToken,isVerified,InvoiceCreation)

export default orderRoute