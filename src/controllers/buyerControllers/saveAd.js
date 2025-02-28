import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";
import Buyer from "../../models/buyerModel.js";

const saveAd = async (req, res) => {
    try {
        const userId = req.userId;
        const adId = req.params.adId;
        const buyer = await Buyer.findById(userId);
        const ad = await Ad.findById(adId);
        if(!ad){
            res.status(NOT_FOUND_CODE).send({
                success: false,
                message: "ad not found"
            })
        }else{
            buyer.savedAds.push(adId);
            await buyer.save();
            res.status(SUCCESS_CODE).send({
                success: true,
                message: "ad saved successfully"
            })
        }
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
            success: false,
            message: error.message
        })
    }
}
export default saveAd;