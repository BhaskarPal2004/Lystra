import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js"
import Ad from "../../models/adModel.js"
import Buyer from "../../models/buyerModel.js"

export const getAdsByLocation = async (req, res) => {
    try {
        const userId = req.userId
        const buyer = await Buyer.findById(userId)
        const ads = await Ad.find({})

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "Ads Fetched Successfully",
            buyer, ads
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}