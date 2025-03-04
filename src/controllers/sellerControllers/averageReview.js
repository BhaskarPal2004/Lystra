import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Review from "../../models/reviewModel.js";
import Seller from "../../models/sellerModel.js";

export const averageReview = async(req,res) =>{
    try{
        const userId = req.userId;
        const user = await Seller.findById(userId);
        const reviewerArray = user.reviews;

        if(reviewerArray.length === 0){
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "You dont have any review"
            })
        }

        reviewerArray.forEach(async(element)=>{
            const reviewer = await Review.findOne({buyerId : element , sellerId : userId})
        })
    }catch(err){

    }
}