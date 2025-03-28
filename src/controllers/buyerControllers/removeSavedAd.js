import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";
import Buyer from "../../models/buyerModel.js";


const removeSavedAd = async (req, res) => {
    try {
        const userId = req.userId;
        const adId = req.params.adId;

        const buyer = await Buyer.findById(userId);
        const ad = await Ad.findById(adId);

        if (!ad) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "ad not found"
            })
        }
        if (!buyer.favoriteAds?.includes(adId)) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Ad is not saved in your wishlist"
            })
        }

        buyer.favoriteAds?.remove(adId);
        await buyer.save();

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "ad removed successfully"
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}

export default removeSavedAd;