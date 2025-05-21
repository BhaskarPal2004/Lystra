import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js";
import { instance } from "../../config/razorpay.js";
import Ad from "../../models/adModel.js";
import Buyer from "../../models/buyerModel.js";
import Order from "../../models/orderModel.js";

export const paymentCheckout = async (req, res) => {
  try {
    const adId = req.params.adId;
    const ad = await Ad.findById(adId)
    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "The ad you're trying to buy no longer exists. It may have been deleted by the seller.",
      });
    }

    const buyer = await Buyer.findById(req.userId);
    if (!buyer || !buyer.address) {
      return res.status(400).json({
        success: false,
        message: "No address found. Please click 'Edit Profile' to add one and continue.",
      });
    }

    const options = {
      amount: Number(ad.price * 100),
      // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
    };

    const order = await instance.orders.create(options)
    
    const dbOrder = await Order.create({
      razorpayOrderId: order.id,
      adId: adId,
      amount: order.amount / 100,
      buyerId: req.userId,
      billingAddress: ad.address,
      shippingAddress: buyer.address,
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