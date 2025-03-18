import Seller from "../models/sellerModel.js"
import Review from "../models/reviewModel.js";

export const calculateReview = async (ad) => {
  try {
    const seller = await Seller.findById(ad.sellerId);
    const sellerReview = await Review.find({sellerId:ad.sellerId});    

    let totalRating = 0;

    sellerReview.forEach((element) => {
      totalRating += element.sellerRating;
    })

    const averageRating = totalRating / (sellerReview.length);

    seller.averageRating = averageRating.toFixed(1);
    await seller.save();

  }
  catch (error) {
    throw new Error(error.message);
  }
}