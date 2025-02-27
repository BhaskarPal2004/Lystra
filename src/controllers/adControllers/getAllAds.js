import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";

export const getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find().populate('sellerId', 'name email');

    res.status(SUCCESS_CODE).send({
      success: true,
      ads: ads
    });
  } catch (error) {
    console.error(error);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({
      message: error.message,
      success: false,
    });
  }
};