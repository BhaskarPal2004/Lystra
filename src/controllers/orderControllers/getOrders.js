import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js"

export const getOrders = async (req, res) => {
    try {
        const userId = req.userId

        console.log(userId)
        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "Orders fetched successfully",

        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}