import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js"
import Buyer from "../../models/buyerModel.js"
import Seller from "../../models/sellerModel.js"

export const getOrders = async (req, res) => {
    try {
        const userId = req.userId

        const user = await Buyer.findById(userId).populate('orders') || await Seller.findById(userId).populate('orders')

        if (user.orders.length === 0)
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Orders not found"
            })

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "Orders fetched successfully",
            totalOrders: user.orders.length,
            data: user.orders
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}