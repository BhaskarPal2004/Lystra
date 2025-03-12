import Seller from "../models/sellerModel.js"

export const calculateReview = async (sellerId, newRating) => {
  try {
    const seller = await Seller.findById(sellerId).populate('reviews');
    const reviewerArray = seller.reviews;

    if(reviewerArray.length === 0) {
      seller.averageReview.averageRating = 0;
      seller.averageReview.topReviews = [];
      await seller.save();
      return;
    }

    let totalRating = 0;
    let topReviews = [];

    reviewerArray.forEach( (element) => {
      totalRating += element.rating;
      if (element.rating >= 4){
        topReviews.push(element.review);
      }
    })

    totalRating += newRating;
    const averageRating = totalRating / (reviewerArray.length + 1);

    seller.averageReview.averageRating = averageRating.toFixed(1);
    seller.averageReview.topReviews = topReviews;

    await seller.save();
  }
  catch (error) {
    throw new Error(error.message);
  }
}