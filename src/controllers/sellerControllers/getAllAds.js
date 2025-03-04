import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js"
import Ad from "../../models/adModel.js"


export const getAllAds = async (req, res) => {
    try {
        //change file name to getMyAds
        //add field to check expiry date and return all/expired/active ads
        const userId = req.userId

        const ads = await Ad.find({ sellerId: userId })

        if (ads.length < 1)
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Ads not found"
            })

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "All ads fetched successfully",
            totalAds: ads.length,
            data: ads,
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}