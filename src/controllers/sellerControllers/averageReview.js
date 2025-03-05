import {
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_CODE,
  SUCCESS_CODE,
} from "../../config/constant.js";
import Seller from "../../models/sellerModel.js";

export const averageReview = async (req, res) => {
  try {
    const userId = req.userId;
    const seller = await Seller.findById(userId).populate('reviews');
    const reviewerArray = seller.reviews;
    let averageRating = 0;
    seller.averageReview.Topreviews=[];
    if (reviewerArray.length === 0) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "You dont have any review",
      });
    }

    reviewerArray.forEach(async (element) => {
        averageRating += element.rating;
        if(element.rating >= 4){
            seller.averageReview.Topreviews.push(element.review)
        }
    });

    averageRating = averageRating/reviewerArray.length;

    seller.averageReview.averageRating = averageRating.toFixed(1)
    await seller.save();

    return res.status(SUCCESS_CODE).json({
      success: true,
      message: "Averagereview added successfully",
    });

  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: err.message,
    });
  }
};
