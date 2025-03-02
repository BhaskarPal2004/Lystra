import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, UNAUTHORIZED_CODE } from "../config/constant.js"
import Seller from "../models/sellerModel.js";


export const isSeller = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "User id not found"
      });
    }

    const seller = await Seller.findById(userId);

    if (!seller) {
      return res.status(UNAUTHORIZED_CODE).send({
        success: false,
        message: "Unauthorized Access"
      });
    }

    next();

  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).send({
      success: false,
      message: error.message
    });
  }
};