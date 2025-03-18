import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import { calculateReview } from "../../helper/calculateReview.js";
import Ad from "../../models/adModel.js";
import Review from "../../models/reviewModel.js";
import Order from "../../models/orderModel.js";


const createReview = async (req, res) => {
    try {
        const userId = req.userId;
        const adId = req.params.adId;
        
        const { productRating,sellerRating,feedbackTitle,feedbackComment} = req.body;

        let isReviewer = false

        const ad = await Ad.findById(adId).populate('reviews');
        
        if (!ad) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Ad not found"
            })
        }
        
        const order = await Order.findOne({buyerId:userId,status:"confirmed",adId:adId});
        
        if(!order){
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "Order first to create review"
            })
        }

        if (ad.sellerId.toHexString() === userId) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "You can't give review to your own ad"
            })
        }

        ad.reviews.some((review) => {
            if (review.buyerId.toHexString() === userId)
                isReviewer = true
        })

        if (isReviewer) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "Only one review per ad is accepted"
            })
        }

        const sellerId = ad.sellerId;
        
        const newReview = await Review.create({
            buyerId: userId,
            adId,
            sellerId,
            productRating,
            sellerRating,
            feedbackTitle,
            feedbackComment
        })

        ad.reviews.push(newReview)
        await ad.save()

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
            message: "Review added successfully",
            newReview
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}

export default createReview;
