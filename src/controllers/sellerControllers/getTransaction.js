import {
  SUCCESS_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_CODE,
} from "../../config/constant.js";
import Ad from "../../models/adModel.js";
import Payment from "../../models/paymentModel.js";
import { converDate } from "../../helper/mongooseDateConversion.js";

export const getTransactions = async (req, res) => {
  try {
    const userId = req.userId;
    const transactionHistory = [];
    const ads = await Ad.find({ sellerId: userId });
    const adIds = [];

    if (!ads.length) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "Ads not found",
      });
    }

    ads.forEach((ad) => {
      adIds.push(ad._id);
    });
    

    const payments = await Payment.find({
      adId: { $in: adIds },
      status: { $in: ["paid", "failed"] },
    });
    
    if (!payments) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "Payments not found",
      });
    }

    payments.forEach((payment) => {
      let obj = {};
      obj.paymentId = payment.razorpayPaymentId;
      obj.Date = converDate(payment.createdAt)[1];
      obj.Time = converDate(payment.createdAt)[0];
      obj.Status = payment.status;
      transactionHistory.push(obj);
    });

    return res.status(SUCCESS_CODE).json({
      success: true,
      message: "Transaction details featch successfully",
      totalTransactions: transactionHistory.length,
      data: transactionHistory,
    });

  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message,
    });
  }
};
