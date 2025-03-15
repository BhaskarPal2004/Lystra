import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js"
import Buyer from "../../models/buyerModel.js";
import Message from "../../models/messagesModel.js"
import Seller from "../../models/sellerModel.js";

export const getChatUsers = async (req, res) => {
    try {
        const userId = req.userId
        const userSet = new Set();

        const messages = await Message.find({
            $or: [
                { senderId: userId },
                { receiverId: userId },
            ],
        });

        messages.forEach((message) => {
            if (message.senderId.toString() === userId) {
                userSet.add(message.receiverId.toString());
            } else {
                userSet.add(message.senderId.toString());
            }
        });

        const uniqueIds = [...userSet];
        const infoObject = { name: 1, email: 1, profilePicture: 1 }

        const [buyerDetails, sellerDetails] = await Promise.all([
            Buyer.find({ _id: { $in: uniqueIds } }, infoObject).exec(),
            Seller.find({ _id: { $in: uniqueIds } }, infoObject).exec()
        ]);

        const userDetails = [...buyerDetails, ...sellerDetails];

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: 'Users fetched successfully',
            totalChatUsers: userDetails.length,
            data: userDetails
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}