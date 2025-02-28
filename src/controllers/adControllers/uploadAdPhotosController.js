import { BAD_REQUEST_CODE, CREATED_CODE, INTERNAL_SERVER_ERROR_CODE, UNAUTHORIZED_CODE } from "../../config/constant.js"
import Ad from "../../models/adModel.js"

export const uploadAdPhotosController = async (req, res) => {
    try {
        const adId = req.params.adId
        const userId = req.userId
        const files = req.files

        const ad = await Ad.findById(adId).populate('sellerId')

        if (ad.sellerId._id != userId) {
            return res.status(UNAUTHORIZED_CODE).json({
                success: false,
                message: "Unauthorized Access"
            })
        }

        files.forEach(async (photo) => {
            if (ad.images.length === 6) {
                return res.status(BAD_REQUEST_CODE).json({
                    success: false,
                    message: "Limit Cross"
                })
            }
            const fileName = `http://localhost:3000/${photo.path}`
            ad.images.push(fileName)
        })

        await ad.save()

        return res.status(CREATED_CODE).json({
            success: true,
            message: "Pictures uploaded successfully",
            images: ad.images
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}