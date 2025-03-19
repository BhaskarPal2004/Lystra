import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";

export const getFeaturedAds = async (req, res) => {
    try {
        const featuredAds = await Ad.find({isFeatured:true}, {
            price: 1, boost: 1, address: 1,
            createdAt: 1, name: 1,isFeatured:1,description:1
        }).populate('address').sort({createdAt:-1}).exec()

        featuredAds.sort((a, b) => b.boost.isBoosted - a.boost.isBoosted)

        return res.status(SUCCESS_CODE).json({
            success: true,
            total: featuredAds.length,
            ads: featuredAds
        });
    }
    catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        });
    }

}