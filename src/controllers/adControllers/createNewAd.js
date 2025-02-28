import Ad from "../../models/adModel.js"
import { SUCCESS_CODE, NOT_FOUND_CODE } from "../../config/constant.js"

export const createNewAd = async (req, res) => {
    try {

        const { name, listingType, category, subCategory, description, details, images, price } = req.body;
        const userId=req.userId;
        console.log("user",userId);
        const newAd = await Ad.create({ sellerId: userId, name, listingType, category, subCategory, description, details, images, price })
        console.log(newAd)

        res.status(SUCCESS_CODE).json({
            success: true,
            message: "New Ad created",
            data: newAd
        })

    }
    catch (error) {
        console.log(error)
        res.status(NOT_FOUND_CODE).json({
            success: false,
            message: "Ad was not created",
        })
    }
}
