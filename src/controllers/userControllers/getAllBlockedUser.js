import BlockUser from "../../models/blockUserModel.js";
import Buyer from "../../models/buyerModel.js";
import Seller from "../../models/sellerModel.js";
import {
    SUCCESS_CODE,
    NOT_FOUND_CODE,
    INTERNAL_SERVER_ERROR_CODE,
} from "../../config/constant.js";

export const getAllBlockedUser = async (req, res) => {
    try {
        const blockerId = req.params.blockerId;
        const blockUserDetails = []
        const findBlokerId = await BlockUser.find({ blockerId: blockerId })


        if (!findBlokerId.length) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "your block list is empty",
            });
        }


        for (const blockedId of findBlokerId) {
            const blockUser = await Buyer.findById(blockedId.blockedId) || await Seller.findById(blockedId.blockedId);
            blockUserDetails.push(blockUser);
        }

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "successfully get blocked user data",
            data: blockUserDetails,
        });

    }
    catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message,
        });
    }
}