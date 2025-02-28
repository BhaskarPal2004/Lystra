import { CREATED_CODE, INTERNAL_SERVER_ERROR_CODE, UNAUTHORIZED_CODE } from "../../config/constant.js"
import Ad from "../../models/adModel.js"

export const uploadAdPhotosController = async (req, res) => {
    try {
        const adId = req.params.adId
        const userId = req.userId
        const files = req.file
        console.log(userId)
        const ad = await Ad.findById(adId).populate('sellerId')
        console.log(ad.sellerId._id)

        if (ad.sellerId._id != userId) {
            return res.status(UNAUTHORIZED_CODE).json({
                success: false,
                message: "Unauthorized Access"
            })
        }

        console.log(req.files)

        return res.status(CREATED_CODE).json({
            success: true,
            message: "Pictures uploaded successfully"
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}