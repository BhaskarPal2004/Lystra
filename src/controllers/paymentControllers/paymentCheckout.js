import { instance } from "../../../server.js"
import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";
import Order from "../../models/orderModel.js";
import Payment from "../../models/paymentModel.js";
import Seller from "../../models/sellerModel.js";

export const paymentCheckout = async (req, res) => {
  try {
    const adId = req.params.adId;
    const ad = await Ad.findById(adId)
    const seller = await Seller.findById(ad.sellerId)

    const options = {
      amount: Number(req.body.amount * 100),
      // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
    };

    const order = await instance.orders.create(options)

    const dbOrder = await Order.create({
      razorpayOrderId: order.id,
      adId: adId,
      buyerId: '67c5390b8c164e38b5206786', //will set after setting header in frontend
      billingAddress: ad.address,
      shippingAddress: "67c7e6d242f08a1d91d8b477", //will set after getting buyer
      paymentType: "online"
    })

    await Payment.create({
      adId: adId,
      razorpayOrderId: order.id,
      amount: order.amount / 100,
      paymentType: 'online'
    })

    seller.orders.push(dbOrder)
    await seller.save()
    // buyer.orders.push(dbOrder)  //will be updated when we use the req header
    // await buyer.save()

    return res.status(SUCCESS_CODE).json({
      success: true,
      data: order
    })

  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message,
    });
  }
}