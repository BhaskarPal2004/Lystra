import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE, UNAUTHORIZED_CODE } from "../../config/constant.js";
import Review from "../../models/reviewModel.js";

const updateReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const userId = req.userId;
        const { rating, review } = req.body;

        const oldReview = await Review.findById(reviewId);

        if (!oldReview)
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Review not found"
            })

        if (oldReview.buyerId.toHexString() !== userId)
            return res.status(UNAUTHORIZED_CODE).json({
                success: false,
                message: "un authorized access, can't edit review"
            })

        if (rating < 0 || rating > 5) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "Ratting must be between 0 to 5"
            })
        }

        oldReview.rating = rating ? Number(rating) : oldReview.rating
        oldReview.review = review ? review : oldReview.review

        await oldReview.save();

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: 'review updated successfully'
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}
export default updateReview;