import { INTERNAL_SERVER_ERROR_CODE, UNAUTHORIZED_CODE } from "../config/constant.js"
import Seller from "../models/sellerModel.js";

export const isSeller = async (req, res, next) => {
  try {
    const userId = req.userId;

    const seller = await Seller.findById(userId);

    if (!seller) {
      return res.status(UNAUTHORIZED_CODE).send({
        success: false,
        message: "Unauthorized Access"
      });
    }
    else next();
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).send({
      message: error.message,
      success: false
    });
  }
};