import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";
import Seller from "../../models/sellerModel.js";

export const deleteAllAds = async (req, res) => {
  try {
    const userId = req.userId;
    const allAds = await Ad.find({ sellerId: userId });

    if (allAds.length < 1)
      return res.status(NOT_FOUND_CODE).send({
        success: false,
        message: "Ad not found",
      })

    await Ad.deleteMany({ sellerId: userId });
    const seller = await Seller.findById(userId)

    seller.ads = []
    await seller.save()

    return res.status(SUCCESS_CODE).send({
      success: true,
      message: "All ad deleted successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({
      success: false,
      message: error.message,
    });
  }
};