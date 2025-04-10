import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE, NOT_FOUND_CODE } from "../../config/constant.js"
import Review from "../../models/reviewModel.js"
import Ad from "../../models/adModel.js";

const getAdReview = async (req, res) => {

    try {

        const adId = req.params.adId;
        const findAd = Ad.findById(adId);

        if (!findAd) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Ad not found"
            })
        }

        const { pageNum = 1 } = req.query

        const page = pageNum < 1 ? 1 : pageNum

        const limit = 4 * 1
        const skip = (page - 1) * limit

        const reviews = await Review.find({ adId: adId }).skip(skip).limit(limit).populate('buyerId')
        const maxPageCount = Math.ceil((reviews.length / limit))

        if (!reviews.length) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "No review found in this ad"
            })
        }

        return res.status(SUCCESS_CODE).json({
            success: true,
            data: reviews,
            totalReviews: reviews.length,
            maxPageCount: maxPageCount,
        })
    }
    catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }

}

export default getAdReview