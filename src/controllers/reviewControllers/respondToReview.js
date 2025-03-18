import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE, UNAUTHORIZED_CODE } from "../../config/constant.js";
import Review from "../../models/reviewModel.js";


const respondToReview = async (req, res) => {
    try {
        const sellerId = req.userId
        const { reviewId } = req.params;
        const reviewResponse = req.body.reviewResponse

        if (!reviewResponse) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "Response is required"
            })
        }

        const review = await Review.findById(reviewId).populate('adId');

        if (review.adId.sellerId.toHexString() !== sellerId) {
            console.log('hello')
            return res.status(UNAUTHORIZED_CODE).json({
                success: false,
                message: "Unauthorized access"
            })
        }

        review.reviewResponse = reviewResponse
        await review.save()

        return res.status(SUCCESS_CODE).send({
            success: true,
            message: "Responded to review successfully"
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({
            success: false,
            message: error.message
        })
    }
}

export default respondToReview;