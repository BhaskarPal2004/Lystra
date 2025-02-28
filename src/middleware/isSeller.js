import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, UNAUTHORIZED_CODE } from "../config/constant.js"
import Seller from "../models/sellerModel.js";


export const isSeller = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(UNAUTHORIZED_CODE).send({
        message: "Unauthorized access",
        success: false
      });
    }
    const seller = await Seller.findById(userId);
    console.log(seller)

    if (!seller) {
      return res.status(NOT_FOUND_CODE).send({
        message: "Seller not found",
        success: false
      });
    }

    req.role = seller;
    next();
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).send({
      message: error.message,
      success: false
    });
  }
};