import Seller from "../models/sellerModel.js"

export const calculateReview = async (ad) => {
  try {
    const seller = await Seller.findById(ad.sellerId)
    const reviewerArray = ad.reviews;

    let totalRating = 0;
    let topReviews = [];

    if (reviewerArray.length === 0) {
      seller.averageReview.averageRating = 0;
      seller.averageReview.topReviews = [];
      await seller.save();
      return;
    }

    reviewerArray.forEach((element) => {
      totalRating += element.rating;
      if (element.rating >= 4) {
        topReviews.push(element.review);
      }
    })

    const averageRating = totalRating / (reviewerArray.length);

    seller.averageReview.averageRating = averageRating.toFixed(1);
    seller.averageReview.topReviews = topReviews;

    await seller.save();

  }
  catch (error) {
    throw new Error(error.message);
  }
}