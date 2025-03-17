import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";
import Order from "../../models/orderModel.js";


export const getAllOrdersOnAd = async (req, res) => {
    try {
        const adId = req.params.adId

        const ad = await Ad.findOne({ _id: adId })

        if (!ad) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Ad not found",
            });
        }

        const orders = await Order.find({
            adId: adId,
            status: {
                $in: ['confirmed', 'failure']
            }
        })

        if (!orders.length) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "Orders not found"
            })
        }

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "Orders on this ad fetched successfully",
            totalOrders: orders.length,
            data: orders
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message,
        });
    }
}