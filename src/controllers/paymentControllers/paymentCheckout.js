import { instance } from "../../../server.js"
import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";
import Order from "../../models/orderModel.js";
import Payment from "../../models/paymentModel.js";
import Seller from "../../models/sellerModel.js";

export const paymentCheckout = async (req, res) => {
  try {
    const adId = req.params.adId;
    const options = {
      amount: Number(req.body.amount * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
    };

    const order = await instance.orders.create(options)
    console.log('order', order);
    console.log(order.id);

    const dbOrder = await Order.create({
      razorpayOrderId: order.id,
      adId: adId,
      buyerId: "67c800de9ac8cbf7692b1c7e",
      billingAddress: "67c800de9ac8cbf7692b1c88",
      shippingAddress: "67c800de9ac8cbf7692b1c8c",
      paymentType: "online"
    })

    console.log('dbOrder =>', dbOrder);
    await Payment.create({
      adId: adId,
      razorpayOrderId:order.id,
      amount:order.amount/100,
      paymentType:'online'
    })

    const ad = await Ad.findById(adId)
    const seller = await Seller.findById(ad.sellerId)
    console.log('my seller => ', seller);
    

    seller.orders.push(dbOrder)
    // buyer.orders.push(dbOrder)
    await seller.save()
    // await buyer.save()

    res.status(SUCCESS_CODE).json({
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