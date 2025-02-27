import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Buyer from "../../models/buyerModel.js";
import Seller from "../../models/sellerModel.js";

export const findUserData = async (req, res) => {
  try {
    const { userId, role } = req.body;
    if (role === "buyer") {
      const findUser = await Buyer.findOne({ _id: userId });
      if (findUser) {
        return res.status(SUCCESS_CODE).json({
          success: true,
          message: "find successfully",
          data: findUser,
        });
      } else {
        return res.status(NOT_FOUND_CODE).json({
          success: false,
          message: "user not found",
        });
      }
    } else if (role === "seller") {
      const findUser = await Seller.findOne({ _id: userId });
      if (findUser) {
        return res.status(SUCCESS_CODE).json({
          success: true,
          message: "find successfully",
          data: findUser,
        });
      } else {
        return res.status(NOT_FOUND_CODE).json({
          success: false,
          message: "user not found",
        });
      }
    }
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
        success: false,
        message: "user not found",
      });
  }
};
