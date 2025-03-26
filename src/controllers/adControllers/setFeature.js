import {
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_CODE,
  SUCCESS_CODE,
  BAD_REQUEST_CODE,
} from "../../config/constant.js";
import Ad from "../../models/adModel.js";
import Subscription from "../../models/subscriptionModel.js";
import Seller from "../../models/sellerModel.js";

export const setFeature = async (req, res) => {
  try {
    const sellerId = req.userId;
    const adIds = req.params.adIds.split(",");

    const seller = await Seller.findById(sellerId);

    if (!seller.isSubscribed) {
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: "subscribed first to add feature",
      });
    }
    const findAllAds = await Ad.find({ sellerId: sellerId });

    if (findAllAds.length === 0) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "Ads not found please crate ad for make it featured",
      });
    }

    const subscription = await Subscription.findOne({ sellerId: sellerId });
    const currentDate = new Date(Date.now());

    if (subscription.subscriptionEndDate < currentDate) {
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message:
          "your plan is expired. please extension subscription plane to add feature",
      });
    }

    if (adIds.length === 0) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "Ads not found please select Ads for feature",
      });
    }

    const ads = await Ad.find({ _id: { $in: adIds }, sellerId: sellerId });
    const subArray = [];

    if (!ads.length) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "Ads not found",
      });
    }

    ads.forEach(async (ad) => {
      if (!ad.isFeatured) {
        ad.isFeatured = true;
        subArray.push(ad._id);
        await ad.save();
      }
    });

    subscription.subscriptionAds = [
      ...subscription.subscriptionAds,
      ...subArray,
    ];
    await subscription.save();

    return res.status(SUCCESS_CODE).json({
      success: true,
      message: "feature added successfully",
    });

  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message,
    });
  }
};
