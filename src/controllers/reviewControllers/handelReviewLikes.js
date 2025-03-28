import {
  INTERNAL_SERVER_ERROR_CODE,
  BAD_REQUEST_CODE,
  SUCCESS_CODE,
  NOT_FOUND_CODE,
} from "../../config/constant.js";
import Review from "../../models/reviewModel.js";

export const handelReviewLikes = async (req, res) => {
  try {
    const userId = req.userId;
    const reviewId = req.params.reviewId;
    const findReview = await Review.findById(reviewId);

    if (!findReview) {
      return res.status(NOT_FOUND_CODE).send({
        success: false,
        message: "review not found",
      });
    }

    if (findReview.buyerId.toHexString() === userId) {
      return res.status(BAD_REQUEST_CODE).send({
        success: false,
        message: "You cannot give a like to yourself",
      });
    }
  
    if (findReview.likes.includes(userId)) {
      const index = findReview.likes.indexOf(userId);
      findReview.likes.splice(index, 1);
      await findReview.save();
      
      return res.status(SUCCESS_CODE).send({
        success: true,
        message: "Like remove successfully",
      });
    }

    findReview.likes.push(userId);
    await findReview.save();

    return res.status(SUCCESS_CODE).send({
      success: true,
      message: "Like given successfully",
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).send({
      success: false,
      message: error.message,
    });
  }
};
