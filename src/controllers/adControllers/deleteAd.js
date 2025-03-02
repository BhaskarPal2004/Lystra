import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";
import Seller from "../../models/sellerModel.js";


export const deleteAd = async (req, res) => {
  try {
    const adId = req.params.adId;
    const userId = req.userId;

    const ad = await Ad.findOne({ _id: adId, sellerId: userId });

    if (!ad)
      return res.status(NOT_FOUND_CODE).send({
        success: false,
        message: "Ad not found",
      });

    await Ad.deleteOne({ _id: adId });
    const seller = await Seller.findById(userId)

    seller.ads.remove(adId)
    await seller.save()

    return res.status(SUCCESS_CODE).json({
      success: true,
      message: "Ad deleted successfully",
    });

  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message,
    });
  }
};
