import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Review from "../../models/reviewModel.js";

const deleteResponse = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const review = await Review.findById(reviewId);
        if( review && review.sellerId==req.userId){
            review.reviewResponse=null;
            review.save();
            res.status(SUCCESS_CODE).send({success:true, message:"response deleted"});
        }else res.status(NOT_FOUND_CODE).send({
            success: false,
            message: "unauthorized access"
        });
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        });
    }
}
export default deleteResponse;