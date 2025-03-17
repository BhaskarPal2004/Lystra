import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js";
import { instance } from "../../config/razorpay.js";
import Ad from "../../models/adModel.js";
import Order from "../../models/orderModel.js";

export const paymentCheckout = async (req, res) => {
  try {
    const adId = req.params.adId;
    const ad = await Ad.findById(adId)

    const options = {
      amount: Number(req.body.amount * 100),
      // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
    };

    const order = await instance.orders.create(options)

    console.log(order)
    const dbOrder = await Order.create({
      razorpayOrderId: order.id,
      adId: adId,
      amount: order.amount / 100,
      buyerId: '67c6fd2d690125c0407e57a2', //will set after setting header in frontend
      billingAddress: ad.address,
      shippingAddress: "67ca9332a77ee8e5dc87658f", //will set after getting buyer
      paymentType: "online"
    })

    return res.status(SUCCESS_CODE).json({
      success: true,
      data: order,
      dbOrder: dbOrder
    })

  } catch (error) {
    console.log(error);
    
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message,
    });
  }
}