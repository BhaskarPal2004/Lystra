import {
  SUCCESS_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_CODE,
} from "../../config/constant.js";

import Order from "../../models/orderModel.js";
import Payment from "../../models/paymentModel.js";
import { converDate } from "../../helper/mongooseDateConversion.js";

export const getTransactions = async (req, res) => {
  try {
    const userId = req.userId;
    const { startDate, endDate } = req.query; 
    const transactionHistory = [];

    const orders = await Order.find({
      buyerId: userId,
      status: { $in: ["confirmed", "failure"] },
    });

    
    if (!orders.length) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "Orders not found",
      });
    }

    const orderIds = orders.map((order) => order.razorpayOrderId);

    const paymentQuery = {
      razorpayOrderId: { $in: orderIds },
    };

    if (startDate && endDate) {
      paymentQuery.createdAt = {
        $gte: new Date(startDate),
        $lt: new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000), 
      };
    } else if (startDate) {
      paymentQuery.createdAt = {
        $gte: new Date(startDate),
      };
    } else if (endDate) {
      paymentQuery.createdAt = {
        $lt: new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000),
      };
    }

    const payments = await Payment.find(paymentQuery);

    payments.forEach((payment) => {
      transactionHistory.push({
        paymentId: payment.razorpayPaymentId,
        Date: converDate(payment.createdAt)[1],
        Time: converDate(payment.createdAt)[0],
        Status: payment.status,
        Amount:payment.amount
      });
    });

    return res.status(SUCCESS_CODE).json({
      success: true,
      message: "Transaction details fetched successfully",
      totalTransactions: transactionHistory.length,
      data: transactionHistory,
    });

  } catch (error) {
    console.error("Error in buyer getTransactions:", error);
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message,
    });
  }
};
