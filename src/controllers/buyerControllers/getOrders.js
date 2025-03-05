import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js"
import Order from "../../models/orderModel.js"

export const getOrders = async (req, res) => {
    try {
        const buyerId = req.userId

        const orders = await Order.find({ buyerId: buyerId })
        if (orders.length === 0) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Order not found"
            })
        }

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "Orders fetched successfully",
            totalOrders: orders.length,
            data: orders
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}