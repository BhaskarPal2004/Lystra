import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Buyer from "../../models/buyerModel.js";
import Seller from "../../models/sellerModel.js";


export const findUserData = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await Buyer.findById(userId) || await Seller.findById(userId)

    if (!user) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "user not found",
      });
    }

    return res.status(SUCCESS_CODE).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });

  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message,
    });
  }
};
