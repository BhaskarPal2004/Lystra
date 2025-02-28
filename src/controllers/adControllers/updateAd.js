import { NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js"
import Ad from "../../models/adModel.js"

export const updateAd = async (req, res) => {
    try {
        const adId = req.params.id

        const updatedFields = req.body
        console.log("updatedFields", updatedFields)
        const ad = await Ad.updateOne({ _id: adId }, { $set: updatedFields })

        res.status(SUCCESS_CODE).json({
            success: true,
            data: ad,
            message: "Ad is updated"

        })
    }
    catch (error) {
        console.log(error)
        res.status(NOT_FOUND_CODE).json({
            success: false,
            message: error
        })
    }


}
