import { CREATED_CODE, INTERNAL_SERVER_ERROR_CODE, UNAUTHORIZED_CODE } from "../../config/constant.js"
import Ad from "../../models/adModel.js"

export const uploadAdFilesController = async (req, res) => {
    try {
        const adId = req.params.adId
        const userId = req.userId
        const files = req.files

        const ad = await Ad.findById(adId).populate('sellerId')

        if (ad.sellerId._id.toHexString() !== userId) {
            return res.status(UNAUTHORIZED_CODE).json({
                success: false,
                message: "Unauthorized Access"
            })
        }

        files.forEach(async (file) => {
            const fileName = `http://localhost:3000/${file.path}`
            ad.files.push(fileName)
        })

        await ad.save()

        return res.status(CREATED_CODE).json({
            success: true,
            message: "Files uploaded successfully",
            totalFiles: ad.files.length,
            files: ad.files
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}