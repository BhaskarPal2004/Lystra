import {
    INTERNAL_SERVER_ERROR_CODE,
    NOT_FOUND_CODE,
    SUCCESS_CODE,
    BAD_REQUEST_CODE,
} from "../../config/constant.js";
import Ad from "../../models/adModel.js";

export const renewAd = async (req, res) => {
    try {
        const userId = req.userId;
        const adId = req.params.adId;

        const findAd = await Ad.findById(adId);
        
        if (!findAd) {
            return res.status(NOT_FOUND_CODE).send({
                success: false,
                message: "Ad not found",
            });
        }
             
        if (findAd.sellerId.toHexString() !== userId) {
            return res.status(BAD_REQUEST_CODE).send({
                success: false,
                message: "This ad not yours",
            });
        }

        if(!findAd.isExpire){
            return res.status(BAD_REQUEST_CODE).send({
                success: false,
                message: "This ad not expire yet",
            });
        }

        const startDate = new Date();
        startDate.setDate(startDate.getDate() + 30);
        findAd.expiredAt = startDate;
        findAd.isExpire = false;
        await findAd.save();

        return res.status(SUCCESS_CODE).send({
            success: true,
            message: "Ad renew Successfully",
        });
  
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message,
        });
    }
};