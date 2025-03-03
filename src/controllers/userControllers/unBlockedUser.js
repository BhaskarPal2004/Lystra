import Buyer from "../../models/buyerModel.js";
import Seller from "../../models/sellerModel.js";
import {
  SUCCESS_CODE,
  NOT_FOUND_CODE,
  INTERNAL_SERVER_ERROR_CODE,
} from "../../config/constant.js";

export const unBlockedUser = async (req, res) => {
  try {
    const userId = req.userId;
    const unBlockId = req.params.unBlockId;

    const user = await Buyer.findById(userId) || await Seller.findById(userId)
    const blockUser = await Buyer.findById(unBlockId) || await Seller.findById(unBlockId)
    
    if (!blockUser) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "User not found",
      });
    }
    const findindex = user.blockedList.indexOf(unBlockId);

    if (findindex === -1) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "This user in not present in your blocklist",
      });
    }

    user.blockedList.splice(findindex, 1);
    await user.save();
    return res.status(SUCCESS_CODE).json({
      success: true,
      message: "Unblocked successfull",
    });

  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: err.message,
    });
  }
};
