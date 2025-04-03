import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE } from "../../config/constant.js";
import Buyer from "../../models/buyerModel.js";
import Seller from "../../models/sellerModel.js";

export const getSavedAds = async (req, res) => {
    try {
        const userId = req.userId;
        const role = req.role
        const user = role === 'buyer' ? await Buyer.findById(userId).populate("favoriteAds") : await Seller.findById(userId).populate("favoriteAds")

        return res.status(NOT_FOUND_CODE).json({
            success: false,
            message: "Your favorite ads",
            totalSavedAds:user.favoriteAds.length,
            data: user.favoriteAds
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}

export default getSavedAds