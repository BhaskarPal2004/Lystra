import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js"
import Review from "../../models/reviewModel.js"

const getReview = async (req, res) => {
    try {
        const userId = req.userId
        const reviews = await Review.find({ sellerId: userId })

        return res.status(SUCCESS_CODE).json({
            success: true,
            data: reviews,
            totalReviews: reviews.length
        })
    }
    catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }

}

export default getReview