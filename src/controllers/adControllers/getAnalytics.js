import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE, UNAUTHORIZED_CODE } from "../../config/constant.js";
import Analytics from "../../models/analyticsModel.js";
import Ad from "../../models/adModel.js";

export const getAnalytics = async (req, res) => {
  try {
    const adId = req.params.adId;
    const sellerId = req.userId;

    const ad = await Ad.findById(adId);

    if (!ad) {
      return res.status(NOT_FOUND_CODE).send({
        success: false,
        message: "Ad not found"
      });
    }

    if (String(ad.sellerId) !== String(sellerId)) {
      return res.status(UNAUTHORIZED_CODE).send({
        success: false,
        message: "Unauthorized: You can only view analytics for your own ads"
      });
    }

    const analytics = await Analytics.findOne({ adId });

    if (!analytics) {
      return res.status(NOT_FOUND_CODE).send({
        success: false,
        message: "Analytics data not found for this ad"
      });
    }

    return res.status(SUCCESS_CODE).send({
      success: true,
      message: "Analytics data fetched successfully",
      data: analytics
    });

  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).send({
      success: false,
      message: error.message
    });
  }
};
