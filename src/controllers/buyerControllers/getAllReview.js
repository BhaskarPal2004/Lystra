import Review from "../../models/reviewModel.js";
import { SUCCESS_CODE, NOT_FOUND_CODE, INTERNAL_SERVER_ERROR_CODE } from "../../config/constant.js";

export const getAllReview = async (req, res) => {
  try {
    const buyerId = req.userId;

    const reviews = await Review.find({ buyerId }).populate('sellerId', 'name email');

    if (!reviews.length) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "No reviews found for this buyer"
      });
    }

    return res.status(SUCCESS_CODE).json({
      success: true,
      message: "Reviews fetched successfully",
      totalReviews: reviews.length,
      data: reviews
    });

  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: err.message,
    });
  }
};