import {
  BAD_REQUEST_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  SUCCESS_CODE,
  NOT_FOUND_CODE,
} from "../../config/constant.js";
import Review from "../../models/reviewModel.js";
import Reply from "../../models/replyModel.js";

export const createReply = async (req, res) => {
  try {
    const userId = req.userId;
    const reviewId = req.params.reviewId;
    const { content } = req.body;
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
        message: "You do not reply yourself",
      });
    }

    const newReply = await Reply.create({
       reviewId: reviewId,
       replierId: userId,
       content: content,
    });

    await newReply.save();

    return res.status(SUCCESS_CODE).send({
      success: true,
      message: "Reply created successfully",
    });

  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).send({
      success: false,
      message: error.message,
    });
  }
};
