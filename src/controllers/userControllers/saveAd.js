import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";
import Buyer from "../../models/buyerModel.js";
import Seller from "../../models/sellerModel.js";


const saveAd = async (req, res) => {
    try {
        const userId = req.userId;
        const adId = req.params.adId;
        const role = req.role
        const user = role === 'buyer' ? await Buyer.findById(userId) : await Seller.findById(userId)

        const ad = await Ad.findById(adId);

        if (!ad) {
            return res.status(NOT_FOUND_CODE).send({
                success: false,
                message: "ad not found"
            })
        }

        if (user.favoriteAds?.includes(adId)) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "Ad is already saved in your wishlist"
            })
        }

        user.favoriteAds?.push(adId);
        await user.save();

        return res.status(SUCCESS_CODE).send({
            success: true,
            message: "ad saved successfully"
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({
            success: false,
            message: error.message
        })
    }
}
export default saveAd;