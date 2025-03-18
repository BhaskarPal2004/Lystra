import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE, UNAUTHORIZED_CODE } from "../../config/constant.js"
import Ad from "../../models/adModel.js"
import Buyer from "../../models/buyerModel.js"
import Seller from "../../models/sellerModel.js"

export const getAllAds = async (req, res) => {
    try {
        let filteredAds = []
        let tempAds = []
        const userId = req.userId
        if (req.role === 'buyer') {
            const buyer = await Buyer.findOne({ _id: userId })
            const allAds = await Ad.find({})

            //buyer blocks seller
            if (buyer.blockedList.length === 0) {
                filteredAds = allAds
            }
            else {
                buyer.blockedList.forEach((blockedId) => {
                    allAds.forEach((ad) => {
                        if (ad.sellerId.toString() !== blockedId.toString()) {
                            filteredAds.push(ad)
                        }
                    })
                })
            }

            //seller blocks buyer
            const sellerIds = []
            const allSeller = await Seller.find({})
            allSeller.map((eachSeller)=>{
                eachSeller.blockedList.map((blockedBuyers)=>{
                    if(blockedBuyers.toString() === userId.toString()){
                        sellerIds.push(eachSeller._id)
                    }
                })
            })
            
            
            filteredAds.forEach((ad)=>{
                sellerIds.forEach((id)=>{
                    if(id.toHexString() !== ad.sellerId.toHexString()){
                        tempAds.push(ad)
                    }
                })
            })
            if (tempAds.length !== 0){
                filteredAds = tempAds
            }
            
        
            if (filteredAds.length === 0) {
                return res.status(NOT_FOUND_CODE).json({
                    success: false,
                    message: "No ads found"
                })
            }
            else {
                return res.status(SUCCESS_CODE).json({
                    success: true,
                    count: filteredAds.length,
                    Ads: filteredAds
                })
            }
        }
        else {
            return res.status(UNAUTHORIZED_CODE).json({
                success: false,
                message: "Unauthorized access"
            })
        }
    }
    catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}