import Ad from "../../models/adModel.js"
import {SUCCESS_CODE,NOT_FOUND_CODE} from "../../config/constant.js"

export const createNewAd = async(req,res) => {
    try{
        const sellerId =  req.body.userId
        const { name, listingType, category, subCategory,  description, details, images, price } = req.body
        const newAd = await Ad.create({sellerId, name, listingType, category, subCategory,  description, details, images, price})
        console.log(newAd)

        res.status(SUCCESS_CODE).json({
            success:true,
            message: "new Ad created",
            data: newAd
        })

    }
    catch(error){
        console.log(error)
        res.status(NOT_FOUND_CODE).json({
            success: false,
            message: "Ad was not created",
        })
    }
}
