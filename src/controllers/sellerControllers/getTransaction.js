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
    const { startDate, endDate } = req.query;
    const transactionHistory = [];

    const ads = await Ad.find({ sellerId: userId });

    if (!ads.length) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "Ads not found",
      });
    }

    const adMap = {};
    ads.forEach((ad) => {
      adMap[ad._id.toString()] = ad;
    });

    const adIds = ads.map((ad) => ad._id);

    const paymentQuery = {
      adId: { $in: adIds },
      status: { $in: ["paid", "failed"] },
    };

    if (startDate && endDate) {
      paymentQuery.createdAt = {
        $gte: new Date(startDate),
        $lt: new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000),
      };
    } else if (startDate) {
      paymentQuery.createdAt = { $gte: new Date(startDate) };
    } else if (endDate) {
      paymentQuery.createdAt = {
        $lte: new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000),
      };
    }

    const payments = await Payment.find(paymentQuery);

    payments.forEach((payment) => {
      const ad = adMap[payment.adId?.toString()];
      const isBoosted =
        ad?.boost?.isBoosted === true &&
        ad?.boost?.boostOrderId === payment.razorpayOrderId;

      transactionHistory.push({
        paymentId: payment.razorpayPaymentId,
        orderId: payment.orderId,
        Date: converDate(payment.createdAt)[1],
        Time: converDate(payment.createdAt)[0],
        Status: payment.status,
        Amount: payment.amount,
        isBoosted, 
      });
    });

    return res.status(SUCCESS_CODE).json({
      success: true,
      message: "Transaction details fetched successfully",
      totalTransactions: transactionHistory.length,
      data: transactionHistory.reverse(),
    });
  } catch (error) {
    console.error("Error in getTransactions:", error);
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message,
    });
  }
};
