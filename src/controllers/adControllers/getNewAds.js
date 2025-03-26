import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";

export const getNewAds = async (req, res) => {
    try {
        const allAds = await Ad.find({}, {
            price: 1, boost: 1, address: 1,
            createdAt: 1, name: 1
        }).populate('address').sort({ createdAt: -1 }).limit(8).exec()

        allAds.sort((a, b) => b.boost.isBoosted - a.boost.isBoosted)

        return res.status(SUCCESS_CODE).json({
            success: true,
            total: allAds.length,
            ads: allAds
        });
    }
    catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        });
    }

}