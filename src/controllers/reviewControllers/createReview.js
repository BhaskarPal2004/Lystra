import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import { calculateReview } from "../../helper/calculateReview.js";
import Ad from "../../models/adModel.js";
import Review from "../../models/reviewModel.js";

const createReview = async (req, res) => {
    try {
        const userId = req.userId;
        const adId = req.params.adId;
        const { rating, review } = req.body;

        // let isReviewer = false

        const ad = await Ad.findById(adId).populate('reviews')

        if (!ad) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Ad not found"
            })
        }

        // if (ad.sellerId.toHexString() === userId) {
        //     return res.status(BAD_REQUEST_CODE).json({
        //         success: false,
        //         message: "You can't give review to your own ad"
        //     })
        // }

        // ad.reviews.some((review) => {
        //     if (review.buyerId.toHexString() === userId)
        //         isReviewer = true
        // })

        // if (isReviewer) {
        //     return res.status(BAD_REQUEST_CODE).json({
        //         success: false,
        //         message: "Only one review per ad is accepted"
        //     })
        // }

        if (rating < 0 || rating > 5) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "Rating must be between 0 to 5"
            })
        }

        const newReview = await Review.create({
            buyerId: userId,
            adId,
            rating,
            review
        })

        ad.reviews.push(newReview)
        await ad.save()

        await calculateReview(ad);

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "Review added successfully",
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}

export default createReview;