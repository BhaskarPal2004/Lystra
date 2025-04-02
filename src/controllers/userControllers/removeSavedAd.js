import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";
import Seller from "../../models/sellerModel.js";


const removeSavedAd = async (req, res) => {
    try {
        const userId = req.userId;
        const adId = req.params.adId;
        const role = req.role
        const user = role === 'user' ? await user.findById(userId) : await Seller.findById(userId)


        const ad = await Ad.findById(adId);

        if (!ad) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "ad not found"
            })
        }
        if (!user.favoriteAds?.includes(adId)) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Ad is not saved in your wishlist"
            })
        }

        user.favoriteAds?.remove(adId);
        await user.save();

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