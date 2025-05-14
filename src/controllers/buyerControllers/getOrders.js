import Order from "../../models/orderModel.js";
import { SUCCESS_CODE, INTERNAL_SERVER_ERROR_CODE } from "../../config/constant.js";
// import Seller from "../../models/sellerModel.js";
import Ad from "../../models/adModel.js";

// export const getOrders = async (req, res) => {
//   try {
//     const userId = req.userId;
//     // const role = req.role;

//     console.log(userId);

//     const sellerAd = await Ad.find({ sellerId: userId })
//     console.log("selllerAd", sellerAd);

//     const orders = await Order.find({ userId, paymentStatus: "paid" })
//       .populate({
//         path: "adId",
//         select: "name files",
//       })
//       .sort({ createdAt: -1 });


//     return res.status(SUCCESS_CODE).json({
//       success: true,
//       message: orders.length > 0 ? "Orders fetched successfully" : "No purchased items found",
//       data: orders,
//     });

//   } catch (error) {
//     return res.status(INTERNAL_SERVER_ERROR_CODE).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


export const getOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const role = req.role;

    let orders = [];

    if (role === "buyer") {
      orders = await Order.find({ buyerId: userId, paymentStatus: "paid" })
        .populate({
          path: "adId",
          select: "name files",
        })
        .sort({ createdAt: -1 });
    } else if (role === "seller") {
      // Get all ads by this seller
      const sellerAds = await Ad.find({ sellerId: userId }).select("_id");
      const adIds = sellerAds.map((ad) => ad._id);

      // Find orders for those ads
      orders = await Order.find({ adId: { $in: adIds }, paymentStatus: "paid" })
        .populate({
          path: "adId",
          select: "name files",
        })
        .sort({ createdAt: -1 });
    }

    return res.status(SUCCESS_CODE).json({
      success: true,
      message: orders.length > 0 ? "Orders fetched successfully" : "No orders found",
      data: orders,
    });

  } catch (error) {
    console.error("Error in getOrders:", error);
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message,
    });
  }
};
