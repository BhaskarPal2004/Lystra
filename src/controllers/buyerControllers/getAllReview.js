import Review from "../../models/reviewModel.js";
import { SUCCESS_CODE, NOT_FOUND_CODE, INTERNAL_SERVER_ERROR_CODE } from "../../config/constant.js";

export const getAllReview = async (req, res) => {
  try {
    const buyerId = req.userId;
    const { pageNum = 1 } = req.query

    const page = pageNum<1 ? 1 : pageNum

    const limit = 5 * 1
    const skip = (page - 1) * limit


    const totalReviewsCount = (await Review.find({ buyerId })).length

    const maxPageCount = Math.ceil((totalReviewsCount / limit))

    const reviews = await Review.find({ buyerId }).populate('sellerId', 'name email').skip(skip).limit(limit);

    if (!reviews.length) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "No reviews found for this buyer"
      });
    }

    return res.status(SUCCESS_CODE).json({
      success: true,
      message: "Reviews fetched successfully",
      totalReviews: totalReviewsCount.length,
      maxPageCount: maxPageCount,
      total:reviews.length,
      data: reviews
    });

  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: err.message,
    });
  }
};