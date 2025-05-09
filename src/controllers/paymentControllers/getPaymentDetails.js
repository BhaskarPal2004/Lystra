import Order from "../../models/orderModel.js";
import Payment from "../../models/paymentModel.js";
import {
  INTERNAL_SERVER_ERROR_CODE,
  SUCCESS_CODE,
  NOT_FOUND_CODE,
} from "../../config/constant.js";

export const getOrderByPaymentId = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findOne({ razorpayPaymentId: paymentId });

    if (!payment) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "Payment not found",
      });
    }

    const order = await Order.findOne({ paymentId: payment._id })
      .populate("adId")
      .populate("buyerId")
      .populate("billingAddress")
      .populate("shippingAddress");

    if (!order) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "Order not found for this payment",
      });
    }

    return res.status(SUCCESS_CODE).json({
      success: true,
      order,
      payment,
    });
  } catch (error) {
    console.error("Error fetching order by payment ID:", error);
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: "Something went wrong while fetching order details",
    });
  }
};
