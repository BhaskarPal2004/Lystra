// import {
//     SUCCESS_CODE,
//     INTERNAL_SERVER_ERROR_CODE,
//     NOT_FOUND_CODE,
//   } from "../../config/constant.js";
//   import Order from "../../models/orderModel.js";
//   import Payment from "../../models/paymentModel.js";
//   import { converDate } from "../../helper/mongooseDateConversion.js";
  
//   export const getTransactions = async (req, res) => {
//     try {
//       const userId = req.userId;
//       const orderIdArray = [];
//       const transactionHistory = [];
  
//       const orders = await Order.find({
//         buyerId: userId,
//         status: { $in: ["confirmed", "failure"] },
//       });
  
//       if (!orders.length) {
//         return res.status(NOT_FOUND_CODE).json({
//           success: false,
//           message: "Order not found",
//         });
//       }
  
//       orders.forEach((order) => {
//         orderIdArray.push(order.razorpayOrderId);
//       });
  
//       const payments = await Payment.find({
//         razorpayOrderId: { $in: orderIdArray },
//       });
  
//       payments.forEach((payment) => {
//         let obj = {};
//         obj.paymentId = payment.razorpayPaymentId;
//         obj.Date = converDate(payment.createdAt)[1];
//         obj.Time = converDate(payment.createdAt)[0];
//         obj.Status = payment.status;
//         transactionHistory.push(obj);
//       });
  
//       return res.status(SUCCESS_CODE).json({
//         success: true,
//         message: "Transaction details featch successfully",
//         totalTransactions : transactionHistory.length,
//         data: transactionHistory,
//       });
//     } catch (error) {
//       return res.status(INTERNAL_SERVER_ERROR_CODE).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };
  

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
    console.log(userId);
    const { startDate, endDate } = req.query; // ⬅️ getting from query params
    console.log(startDate);
    console.log(endDate);
    const transactionHistory = [];

    // 1. Fetch buyer's orders
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

    // 2. Build payment query
    const paymentQuery = {
      razorpayOrderId: { $in: orderIds },
    };

    // 3. Add date filtering if provided
    if (startDate && endDate) {
      paymentQuery.createdAt = {
        $gte: new Date(startDate),
        $lt: new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000), // include entire end day
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

    // 4. Fetch payments
    const payments = await Payment.find(paymentQuery);

    // 5. Prepare transaction response
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
