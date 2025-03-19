import {
  BAD_REQUEST_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  SUCCESS_CODE,
  NOT_FOUND_CODE,
} from "../../config/constant.js";
import Seller from "../../models/sellerModel.js";
import Buyer from "../../models/buyerModel.js";
import Follow from "../../models/followModel.js";

export const unFollow = async (req, res) => {
  try {
    const userId = req.userId;
    const followId = req.params.followId;

    const follow =
      (await Seller.findById(followId)) || (await Buyer.findById(followId));

    if (!follow) {
      return res.status(NOT_FOUND_CODE).send({
        success: false,
        message: "user not found",
      });
    }

    const findFollower = await Follow.findOne({
      following: followId,
      follower: userId
    });

    if (!findFollower) {
      return res.status(BAD_REQUEST_CODE).send({
        success: false,
        message: "you are not following this user",
      });
    }

    await Follow.deleteOne({ following: followId,follower: userId});

    return res.status(SUCCESS_CODE).send({
      success: true,
      message: "Unfollow successfully",
    });

  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).send({
      success: false,
      message: error.message,
    });
  }
};
