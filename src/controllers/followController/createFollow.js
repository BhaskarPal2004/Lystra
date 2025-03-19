import {
  BAD_REQUEST_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  SUCCESS_CODE,
  NOT_FOUND_CODE,
} from "../../config/constant.js";
import Seller from "../../models/sellerModel.js";
import Buyer from "../../models/buyerModel.js";
import Follow from "../../models/followModel.js";

export const createFollow = async (req, res) => {
  try {
    const userId = req.userId;
    const followId = req.params.followId;

    const follow = await Seller.findById(followId) || await Buyer.findById(followId);
    console.log(follow);
    

    if (!follow) {
      return res.status(NOT_FOUND_CODE).send({
        success: false,
        message: "user not found",
      });
    }

    if (followId === userId) {
      return res.status(BAD_REQUEST_CODE).send({
        success: false,
        message: "You can not follow yourself",
      });
    }

    const findFollow = await Follow.findOne({ following: followId ,follower: userId});
    if (findFollow) {
      return res.status(BAD_REQUEST_CODE).send({
        success: false,
        message: "You already follow this user",
      });
    }

    const newFollow = await Follow.create({
      following: followId,
      follower: userId,
    });

    await newFollow.save();

    return res.status(SUCCESS_CODE).send({
      success: true,
      message: "Follow created successfully",
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).send({
      success: false,
      message: error.message,
    });
  }
};
