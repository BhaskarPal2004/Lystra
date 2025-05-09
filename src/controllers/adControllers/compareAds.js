import Ad from "../../models/adModel.js";
import Category from "../../models/categoryModel.js";
import Review from "../../models/reviewModel.js";
import Seller from "../../models/sellerModel.js";
import { SUCCESS_CODE, NOT_FOUND_CODE, INTERNAL_SERVER_ERROR_CODE,BAD_REQUEST_CODE} from "../../config/constant.js";

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


    const baseCategoryId = ads[0].category.toString();
    const hasDifferentCategory = ads.some(
      (ad) => ad.category.toString() !== baseCategoryId
    );

    if (hasDifferentCategory) {
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: "All ads must belong to the same category for comparison.",
      });
    }
    
    const comparisonData = await Promise.all(
      ads.map(async (ad) => {
        const category = await Category.findById(ad.category);
        const seller = await Seller.findById(ad.sellerId);
        const review = await Review.findById(ad.reviews);

        return {
          name: ad.name || '',
          category: category?.name || '',
          details: ad.details || '',
          summary: ad.description || '',
          price: ad.price || '',
          condition: ad.condition || '',
          seller: seller?.name || '',
          listedOn: ad.createdAt || '',
          sellerAverageRating: review?.sellerRating || '',
          productAverageRating: review?.productRating || '',
        };
      })
    );

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

