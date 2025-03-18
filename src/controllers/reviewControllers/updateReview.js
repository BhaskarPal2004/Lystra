import {  INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE, UNAUTHORIZED_CODE } from "../../config/constant.js";
import { calculateReview } from "../../helper/calculateReview.js";
import Ad from "../../models/adModel.js";
import Review from "../../models/reviewModel.js";

const updateReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const userId = req.userId;
        const { productRating,sellerRating,feedbackTitle,feedbackComment} = req.body;

        const oldReview = await Review.findById(reviewId);

        if (!oldReview)
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Review not found"
            })

        if (oldReview.buyerId.toHexString() !== userId)
            return res.status(UNAUTHORIZED_CODE).json({
                success: false,
                message: "Unauthorized access, can't edit review"
            })

        oldReview.productRating = productRating ? productRating : oldReview.productRating;
        oldReview.sellerRating = sellerRating ? sellerRating : oldReview.sellerRating;
        oldReview.feedbackTitle = feedbackTitle ? feedbackTitle:oldReview.feedbackTitle;
        oldReview.feedbackComment = feedbackComment ? feedbackComment:oldReview.feedbackComment;
        

        await oldReview.save();

        const ad = await Ad.findById(oldReview.adId).populate('reviews');

        if (!ad) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Ad not found"
            })
        }

        try {
            await calculateReview(ad);

        } catch (error) {
            return res.status(INTERNAL_SERVER_ERROR_CODE).json({
                success: false,
                message: error.message
            })
        }

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: 'Review updated successfully'
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}
export default updateReview;