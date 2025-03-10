import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE, UNAUTHORIZED_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";


export const getAllOrdersOnAd = async (req, res) => {
    try {
        const sellerId = req.userId
        const adId = req.params.adId

        const ad = await Ad.findOne({ _id: adId }).populate("orders")

        if (!ad) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Ad not found",
            });
        }

        if (ad.sellerId.toHexString() !== sellerId) {
            return res.status(UNAUTHORIZED_CODE).json({
                success: false,
                message: "Unauthorized access",
            });
        }

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "Orders on this ad fetched successfully",
            totalOrders: ad.orders.length,
            data: ad.orders
        })
    }
    catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error,
        });
    }
}