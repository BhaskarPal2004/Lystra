import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE } from "../../config/constant.js";
import crypto from 'crypto';
import Order from "../../models/orderModel.js";
import Payment from "../../models/paymentModel.js";


export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET).update(body.toString()).digest('hex')

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const order = await Order.findOne({ razorpayOrderId: razorpay_order_id })

      const existingPayment = await Payment.findOne({
        razorpayOrderId: order.razorpayOrderId
      })

      if (!existingPayment) {
        console.log('exists :>> ', existingPayment);
        const payment = await Payment.create({
          adId: order._id,
          razorpayOrderId: order.razorpayOrderId,
          amount: order.amount,
          paymentType: 'online',
          razorpayPaymentId: razorpay_payment_id,
          razorpayPaymentSignature: razorpay_signature,
          status: 'paid'
        })

        order.paymentId = payment._id
      }
      else {
        existingPayment.razorpayPaymentSignature = razorpay_signature
        existingPayment.status = 'paid'
        await existingPayment.save()

        order.paymentId = existingPayment._id
      }

      order.paymentStatus = 'paid'
      order.status = 'confirmed'
      await order.save()

      res.redirect(`http://localhost:5173/payment/success?reference=${razorpay_payment_id},${razorpay_order_id}`)
    }
    else {
      return res.status(BAD_REQUEST_CODE).json({
        success: true,
        message: "Payment is not authenticated"
      })
    }

  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message,
    });
  }
}