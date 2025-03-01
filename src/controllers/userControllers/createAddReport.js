import Ad from "../../models/adModel.js";
import Buyer from "../../models/buyerModel.js";
import Seller from "../../models/sellerModel.js";
import {
  SUCCESS_CODE,
  NOT_FOUND_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  UNAUTHORIZED_CODE,
} from "../../config/constant.js";

export const createAddReport = async (req, res) => {
  try {
    const userId = req.userId;
    const role = req.role;
    const { message, isFake, isFraudulent } = req.body;
    const { adId } = req.params;

    const user =
      role === "buyer"
        ? await Buyer.findById(userId)
        : await Seller.findById(userId);

    const ad = await Ad.findById(adId);
    if (user && ad) {
      let findUserInReportArray = false;
      ad.report.forEach((ele) => {
        if (ele.reporterId == userId) {
          findUserInReportArray = true
        }
      });
      if (findUserInReportArray === true) {
        res.status(UNAUTHORIZED_CODE).json({
          success: true,
          message: "you already reported",
        });
      }
      else {
        await Ad.findByIdAndUpdate(adId, {
          $push: { report: { reporterId: userId, message, isFake, isFraudulent } },
        });
        res.status(SUCCESS_CODE).json({
          success: true,
          message: "Report send successfully",
        });
      }
    } else {
      res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "Report sending failed",
      });
    }
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: err.message,
    });
  }
};
