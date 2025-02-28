import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Review from "../../models/reviewModel.js";
import Seller from "../../models/sellerModel.js";
import Ad from "../../models/adModel.js"
const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { userId } = req.body;
        const review = await Review.findById(reviewId);
        if (review) {
            if (review.buyerId == userId) {
                //delete from seller
                const ad =await Ad.findById(review.adId);
                const seller = await Seller.findById(ad.sellerId);
                seller.reviews.remove(reviewId);
                await seller.save();
                //delete
                await Review.findByIdAndDelete(reviewId);
                res.status(SUCCESS_CODE).send({
                    success: true,
                    message: 'review deleted successfully'
                })
            } else res.status(NOT_FOUND_CODE).send({
                success: false,
                message: "review not found"
            })
        } else res.status(NOT_FOUND_CODE).send({
            success: false,
            message: "review not found"
        })
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
            success: false,
            message: error.message
        })
    }
}
export default deleteReview;