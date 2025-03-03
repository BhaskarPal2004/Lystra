import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Review from "../../models/reviewModel.js";
import Seller from "../../models/sellerModel.js";


const createReview = async (req, res) => {
    try {
        const userId = req.userId;
        const sellerId = req.params.sellerId;
        const { rating, review } = req.body;
        let isReviewer = false

        const seller = await Seller.findById(sellerId).populate('reviews');

        if (!seller) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Seller not found"
            })
        }

        seller.reviews.forEach((review) => {
            if (review.buyerId.toHexString() === userId)
                isReviewer = true
        })

        if (isReviewer) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "Only one review per seller is accepted"
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
            sellerId: sellerId,
            rating,
            review
        })

        await newReview.save();

        //storing review in seller
        seller.reviews.push(newReview);
        await seller.save();

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