import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE, UNAUTHORIZED_CODE } from "../../config/constant.js";
import { calculateReview } from "../../helper/calculateReview.js";
import Ad from "../../models/adModel.js";
import Review from "../../models/reviewModel.js";


const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const userId = req.userId;

        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(NOT_FOUND_CODE).send({
                success: false,
                message: "Review not found"
            })
        }

        if (review.buyerId.toHexString() !== userId) {
            return res.status(UNAUTHORIZED_CODE).json({
                success: false,
                message: "Unauthorized access"
            })
        }

        await Review.deleteOne({ _id: reviewId })

        const ad = await Ad.findById(review.adId).populate('reviews')
        ad.reviews.remove(reviewId)

        await ad.save()

        try {
            await calculateReview(ad)

        } catch (error) {
            return res.status(INTERNAL_SERVER_ERROR_CODE).json({
                success: false,
                message: error.message
            })
        }

        return res.status(SUCCESS_CODE).json({
            success: false,
            message: "Review deleted successfully"
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}

export default deleteReview;