import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js";
import { instance } from "../../config/razorpay.js";
import Ad from "../../models/adModel.js";
import Order from "../../models/orderModel.js";

export const paymentCheckout = async (req, res) => {
  try {
    const adId = req.params.adId;
    const ad = await Ad.findById(adId)

    const options = {
      amount: Number(ad.price * 100),
      // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
    };

    const order = await instance.orders.create(options)

    console.log("userId", req.userId);

    console.log(order)
    const dbOrder = await Order.create({
      razorpayOrderId: order.id,
      adId: adId,
      amount: order.amount / 100,
      buyerId: req.userId, //will set after setting header in frontend
      billingAddress: ad.address,
      shippingAddress: "67c96da94c6608143ef4b6e5", //will set after getting buyer
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