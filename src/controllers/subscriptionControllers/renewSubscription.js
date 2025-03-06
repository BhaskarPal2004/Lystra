import Subscription from "../../models/subscriptionModel.js";
import {
  INTERNAL_SERVER_ERROR_CODE,
  SUCCESS_CODE,
  BAD_REQUEST_CODE,
} from "../../config/constant.js";

export const renewSubscription = async (req, res) => {
  try {

    const subscriptionId = req.params.subscriptionId;
    const sellerId = req.userId;
    const subscription = await Subscription.find({
      sellerId: sellerId,
      _id: subscriptionId,
    });

    if (!subscription.length || !subscriptionId) {
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: "you don't have this subscription",
      });
    }

    const currentDate = new Date(Date.now());

    if (subscription[0].subscriptionEndDate < currentDate) {
      subscription[0].subscriptionEndDate = new Date(
        currentDate.getTime() + 90 * 24 * 60 * 60 * 1000
      );
      subscription[0].renewDate = currentDate;
    } else {
      subscription[0].renewDate = currentDate;
      subscription[0].subscriptionEndDate = new Date(
      subscription[0].subscriptionEndDate.getTime() + 90 * 24 * 60 * 60 * 1000
      );
    }

    await subscription[0].save();

    return res.status(SUCCESS_CODE).json({
      success: true,
      message: "Renew complete",
    });

  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message,
    });
  }
};
