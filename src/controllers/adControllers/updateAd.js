import { NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js"
import Ad from "../../models/adModel.js"
 
export const updateAd = async(req,res) => {
   try{
     const adId = req.params.id
     console.log("id",adId)
    const updatedFields = req.body
    const ad = await Ad.findByIdAndUpdate(adId, {$set:updatedFields},function(err,docs){
        if(err){
            console.log(err)
            res.status(NOT_FOUND_CODE).json({
                success:false,
                message:err
            })
        }
        else{
            console.log(docs)
        }
    })

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
        message:error
    })
   }


}
