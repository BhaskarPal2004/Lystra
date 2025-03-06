import Ad from "../../models/adModel.js";
import { SUCCESS_CODE, NOT_FOUND_CODE, INTERNAL_SERVER_ERROR_CODE, BAD_REQUEST_CODE } from "../../config/constant.js";

export const compareAds = async (req, res) => {
  try {
    const adIds = req.params.adIds.split(',');

    const ads = await Ad.find({ _id: { $in: adIds } }).populate('sellerId', 'name averageReview');

    if (!ads.length) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "No ads found for the provided IDs."
      });
    }

    const categories = ads.map(ad => ad.category);
    const uniqueCategories = new Set(categories);

    if (uniqueCategories.size > 1) {
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: "All ads must belong to the same category for comparison."
      });
    }

    const comparisonData = ads.map(ad => ({
      name: ad.name,
      category: ad.category,
      subCategory: ad.subCategory,
      details: ad.details.details,
      summary: ad.description,
      price: ad.price,
      condition: ad.condition,
      seller: ad.sellerId.name,
      listedOn: ad.createdAt,
      sellerAverageRating: ad.sellerId.averageReview.averageRating,
      sellerAverageReview: ad.sellerId.averageReview.topReviews,
    }));

    return res.status(SUCCESS_CODE).json({
      success: true,
      message: "Ads comparison data fetched successfully.",
      data: comparisonData
    });

  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message,
    });
  }
};