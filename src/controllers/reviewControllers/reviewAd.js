import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Review from "../../models/reviewModel.js";
import Seller from "../../models/sellerModel.js";
import Ad from "../../models/adModel.js"
const reviewAd = async (req, res) => {
    try {
        const adId = req.params.adId;
        const ad = await Ad.findById(adId);
        if (ad) {
            //creating review
            const { userId, rating, review } = req.body;
            const newReview = new Review({
                buyerId: userId, adId, rating, review
            })
            await newReview.save();
            //storing review in seller
            const seller = await Seller.findById(ad.sellerId);
            seller.reviews.push(newReview._id);
            seller.save();
            res.status(SUCCESS_CODE).send({
                success: true,
                message: "review added successfully"
            })
        } else res.status(NOT_FOUND_CODE).send({
            success: false,
            message: "Ad not found"
        })
    } catch (error) {

        res.status(INTERNAL_SERVER_ERROR_CODE).send({
            success: false,
            message: error.message
        })
    }
}
export default reviewAd;