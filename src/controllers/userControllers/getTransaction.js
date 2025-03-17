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
    const orderIdArray = [];
    const transactionHistory = [];

    const orders = await Order.find({
      buyerId: userId,
      status: { $in: ["confirmed", "failure"] },
    });

    if (!orders.length) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "Order not found",
      });
    }

    orders.forEach((order) => {
      orderIdArray.push(order.razorpayOrderId);
    });

    const payments = await Payment.find({
      razorpayOrderId: { $in: orderIdArray },
    });

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
      totalTransactions : transactionHistory.length,
      data: transactionHistory,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message,
    });
  }
};
