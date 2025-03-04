import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Review from "../../models/reviewModel.js";

const respondToReview =async (req, res) => {
    console.log('req.params :>> ', req.params);
    try{
        const {reviewId}=req.params;
        await Review.findByIdAndUpdate(reviewId , req.body);
        res.status(SUCCESS_CODE).send({
            success: true,
            message: "responded to review success fully"
        })
    }catch(error){
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
            success: false,
            message: error.message
        })
    }
}

export default respondToReview;