import { NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js"
import Ad from "../../models/adModel.js"

export const updateAd = async (req, res) => {
    try {
        const adId = req.params.adId
        const updatedFields = req.body
        if (req.body.expireInDays) {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + req.body.expireInDays);
            delete updatedFields.expireInDays;
            updatedFields.expiryDate = expiryDate;
        }

        const ad = await Ad.findOneAndUpdate({ _id: adId }, { $set: updatedFields })
        if (!ad)
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Ad not found"
            })

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "Ad is updated successfully",
            data: await Ad.findById(adId),
        })

    } catch (error) {
        return res.status(NOT_FOUND_CODE).json({
            success: false,
            message: error.message
        })
    }
}
