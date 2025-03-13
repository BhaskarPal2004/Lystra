import Seller from "../models/sellerModel.js"

export const calculateReview = async (ad) => {
  try {
    const seller = await Seller.findById(ad.sellerId)
    const reviewerArray = ad.reviews;
    
    if(reviewerArray.length === 0) {
      seller.averageReview.averageRating = 0;
      seller.averageReview.topReviews = [];
      await seller.save();
      return;
    }

    let totalRating = 0;
    let topReviews = [];

    reviewerArray.forEach( (element) => {
      console.log('my rating',element.rating);
      totalRating += element.rating;
      if (element.rating >= 4){
        topReviews.push(element.review);
      }
    })
    
    console.log('total',totalRating);
    console.log('length',reviewerArray.length);
    const averageRating = totalRating / (reviewerArray.length);
    console.log('average',averageRating);
    
    seller.averageReview.averageRating = averageRating.toFixed(1);
    seller.averageReview.topReviews = topReviews;

    await seller.save();
  }
  catch (error) {
    throw new Error(error.message);
  }
}