// import { el } from "@faker-js/faker";
import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
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
        let averageRating = 5;

        reviewerArray.forEach(async(element)=>{
            console.log(userId);
            console.log(element);
            const reviewer = await Review.findOne({_id: element});
            console.log("review",reviewer)
            averageRating = averageRating + reviewer.rating;
            console.log(averageRating)
        })
        console.log(averageRating)
        user.averageReview.averageRating = averageRating/reviewerArray.length;
        await user.save();

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "AverageReview added successfully",
        })

    }catch(err){
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: err.message
        })
    }
}