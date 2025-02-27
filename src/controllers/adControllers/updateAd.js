import { NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js"
import Ad from "../../models/adModel.js"
 
export const updateAd = async(req,res) => {
   try{
     const adId = req.params.id
     console.log("id",adId)
    const { name, listingType, category, subCategory,  description, details, images, price, userId } = req.body
    const ad = await Ad.findOne({_id:adId,sellerId:userId})

    ad.name = name
    ad.listingType = listingType
    ad.category = category
    ad.subCategory = subCategory
    ad.description = description
    ad.details = details 
    ad.images = images 
    ad.price = price

    await ad.save()
    res.status(SUCCESS_CODE).json({
        success:true,
        data:ad,
        message:"Ad is updated"

    })
   }
   catch(error){
    console.log(error)
    res.status(NOT_FOUND_CODE).json({
        success:false,
        message:"Ad is not updated"
    })
   }


}
