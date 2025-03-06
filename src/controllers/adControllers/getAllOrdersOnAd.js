import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE, UNAUTHORIZED_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";
import Order from "../../models/orderModel.js";

export const getAllOrdersOnAd = async (req, res) => {
    try {
        const sellerId = req.userId
        const adId = req.params.adId
        let doesAdExist = null
        let isItYourAd = null
        let allOrders = []


        let ad = await Ad.findOne({ _id: adId })
        if (!ad) {
            doesAdExist = false
        }
        else {
            doesAdExist = true
        }

        ad = await Ad.findOne({ _id: adId, sellerId }).populate("orders")


      
        if (!ad) {
            isItYourAd = false
        }
        else {
            isItYourAd = true
        }

        if (!doesAdExist) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Ad not found",
            });
        }
        else if (!isItYourAd) {
            return res.status(UNAUTHORIZED_CODE).json({
                success: false,
                message: "You are not authorised to view this ad",
            });
        }
        else {
            return res.status(SUCCESS_CODE).json({
                success: true,
                message: "your orders",
                data: ad

            });
        }

    }
    catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error,
        });
    }
}