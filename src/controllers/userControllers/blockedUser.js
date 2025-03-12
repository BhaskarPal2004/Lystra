import Buyer from "../../models/buyerModel.js";
import Seller from "../../models/sellerModel.js";
import BlockUser from "../../models/blockUserModel.js";
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

    const seller = await Buyer.findById(userId);
    const buyer = await Seller.findById(userId);

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

    const alreadyaBlocked = await BlockUser.findOne({blockerId: userId, blockedId: blockId});
    if (alreadyaBlocked) {
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: "You already blocked this user",
      });
    }

    const newBlock = new BlockUser ({
      blockerId: userId,
      blockedId: blockId
    })

    await newBlock.save();

    if(buyer) {
      buyer.blockedList.push(newBlock._id);
      await buyer.save();
    } else {
      seller.blockedList.push(newBlock._id);
      await seller.save();
    }

    return res.status(SUCCESS_CODE).json({
      success: true,
      message: "Blocked successfully",
    });

  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: err.message,
    });
  }
};
