import Buyer from "../../models/buyerModel.js";
import Seller from "../../models/sellerModel.js";
import {
  SUCCESS_CODE,
  NOT_FOUND_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  BAD_REQUEST_CODE
} from "../../config/constant.js";

export const blockedUser = async (req, res) => {
  try {
    const userId = req.userId;
    const blockId = req.params.blockId;

    const user = await Buyer.findById(userId) || await Seller.findById(userId)
    const blockUser = await Buyer.findById(blockId) || await Seller.findById(blockId)
    
    if (!blockUser) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "User not found",
      });
    }

    if(userId === blockId){
        return res.status(BAD_REQUEST_CODE).json({
            success: false,
            message: "you can not block yourself",
          });
    }

    const findIdinArray = user.blockedList.includes(blockId)
    if (findIdinArray) {
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: "You already blocked this user",
      });
    }

    user.blockedList.push(blockId);
    await user.save();
    return res.status(SUCCESS_CODE).json({
      success: true,
      message: "Blocked successfull",
    });

  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: err.message,
    });
  }
};
