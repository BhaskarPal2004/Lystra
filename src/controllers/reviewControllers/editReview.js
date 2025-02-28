import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE, UNAUTHORIZED_CODE } from "../../config/constant.js";
import Review from "../../models/reviewModel.js";
const editReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const {rating, review}= req.body;
        const { userId } = req;
        const updateReview = await Review.findById(reviewId);
        if (updateReview) {
            if (updateReview.buyerId == userId) {
                //update
                updateReview.rating=rating??rating;
                updateReview.review=review??review;
                await updateReview.save();
                res.status(SUCCESS_CODE).send({
                    success: true,
                    message: 'review updated successfully'
                })
            } else res.status(UNAUTHORIZED_CODE).send({
                success: false,
                message: "un authorized access, can't edit review"
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
export default editReview;