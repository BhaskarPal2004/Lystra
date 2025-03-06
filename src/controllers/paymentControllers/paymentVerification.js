import { SUCCESS_CODE } from "../../config/constant.js";

export const paymentVerification = async (req, res) => {

  const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;
  console.log(req.body);
  
  res.status(SUCCESS_CODE).json({
    success: true,
  })
}