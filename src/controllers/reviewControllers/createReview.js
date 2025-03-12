import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import { calculateReview } from "../../helper/calculateReview.js";
import Ad from "../../models/adModel.js";
import Review from "../../models/reviewModel.js";

const createReview = async (req, res) => {
    try {
        const userId = req.userId;
        const adId = req.params.adId;
        const { rating, review } = req.body;
        let isReviewer = false

        const ad = await Ad.findById(adId).populate('reviews');

        if (!ad) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "ad not found"
            })
        }

        ad.reviews.forEach((review) => {
            if (review.buyerId.toHexString() === userId)
                isReviewer = true
        })

        if (isReviewer) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "Only one review per ad is accepted"
            })
        }

        if (rating < 0 || rating > 5) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "Ratting must be between 0 to 5"
            })
        }

        //creating review
        const newReview = new Review({
            buyerId: userId,
            adId: adId,
            rating,
            review
        })

        await newReview.save();

        //storing review in ad
        ad.reviews.push(newReview);
        await ad.save();

        await calculateReview(ad.sellerId, rating);

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "Review added successfully"
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}

export default createReview;