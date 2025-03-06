import { BAD_REQUEST_CODE } from "../../config/constant.js";
import crypto from 'crypto';

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

      res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id},${ razorpay_order_id}`)
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