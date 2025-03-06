import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE } from "../../config/constant.js";
import crypto from 'crypto';
import Order from "../../models/orderModel.js";
import Payment from "../../models/paymentModel.js";

export const paymentVerification = async (req, res) => {

  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest('hex')

    // console.log('sig received', razorpay_signature);
    // console.log('sig generated', expectedSignature);
    // console.log(req.body);

    const isAuthentic = expectedSignature === razorpay_signature;

    if(isAuthentic){
      console.log(razorpay_order_id);
      const order = await Order.findOne({razorpayOrderId:razorpay_order_id})
      const payment = await Payment.findOne({razorpayOrderId:razorpay_order_id})

      payment.razorpayPaymentId = razorpay_payment_id;
      payment.razorpayPaymentSignature = razorpay_signature;
      payment.status = 'paid';
      await payment.save();
      
      order.paymentStatus = 'paid'
      order.paymentId = payment._id
      order.status = 'confirmed'
      await order.save()
      
      console.log("payment => ", payment);
      
      console.log('db order => ', order);
      
      
      // res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id},${ razorpay_order_id}`)
    }
    else {
      res.status(BAD_REQUEST_CODE).json({
        success: true,
      })
    }
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message,
    });
  }
}