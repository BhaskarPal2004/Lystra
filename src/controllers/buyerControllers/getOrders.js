import Order from "../../models/orderModel.js";
import { SUCCESS_CODE, INTERNAL_SERVER_ERROR_CODE } from "../../config/constant.js";
// import Seller from "../../models/sellerModel.js";
import Ad from "../../models/adModel.js";

export const getOrders = async (req, res) => {
  try {
    const buyerId = req.userId;

    console.log(buyerId);

    const sellerAd = await Ad.find({ sellerId: buyerId })
    console.log("selllerAd", sellerAd);

    const orders = await Order.find({ buyerId, paymentStatus: "paid" })
      .populate({
        path: "adId",
        select: "name files",
      })
      .sort({ createdAt: -1 });


    return res.status(SUCCESS_CODE).json({
      success: true,
      message: orders.length > 0 ? "Orders fetched successfully" : "No purchased items found",
      data: orders,
    });

  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message,
    });
  }
};
